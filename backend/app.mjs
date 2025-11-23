import './config/config.mjs';
import './config/db.mjs';

import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { GoogleGenAI } from "@google/genai";


import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import loginRoutes from './routes/loginRoutes.mjs';
import quizRoutes from './routes/quizRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import envRoutes from './routes/envRoutes.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const User = mongoose.model('User');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRoutes);
app.use(quizRoutes);
app.use(userRoutes);
app.use(envRoutes);

app.use((req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use(express.json());

const ai = new GoogleGenAI({});
app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error contacting Gemini API" });
  }
});



app.listen(process.env.PORT || 3000);