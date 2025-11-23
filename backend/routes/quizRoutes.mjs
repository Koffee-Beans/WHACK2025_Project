import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Problem = mongoose.model('Problem');

router.get('/api/problems/random', async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 5;
        
        const filter = {$or: [{ "answers.e": { $exists: false } }, { "answers.e": null }]};
        
        const problems = await Problem.aggregate([
            { $match: filter },
            { $sample: { size: count } }
        ]);
        
        const quizData = problems.map(p => ({
            id: p._id,
            question: p.problem,
            answers: [p.answers.a, p.answers.b, p.answers.c, p.answers.d, p.answers.e].filter(Boolean),
            correct: p.answers[p.correctAnswer.toLowerCase()],
            year: p.year,
            level: p.level,
            number: p.number
        }));
        
        res.json(quizData);
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
});

export default router;