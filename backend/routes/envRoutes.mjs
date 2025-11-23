import express from 'express';

const router = express.Router();

router.get('/api/gemini-url', (req, res) => {
    res.json({ geminiUrl: process.env.GEMINI_URL });
})

export default router;