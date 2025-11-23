import './config/config.mjs';
import './config/db.mjs';

import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import passport from 'passport';


import path from 'path';
import { fileURLToPath } from 'url';

import loginRoutes from './routes/loginRoutes.mjs';
import quizRoutes from './routes/quizRoutes.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const User = mongoose.model('User');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRoutes);
app.use(quizRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

/*

app.get('/', (req, res) => {
    res.redirect('/login');
});
*/

app.listen(process.env.PORT || 3000);