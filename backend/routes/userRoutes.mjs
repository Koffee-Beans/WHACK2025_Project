import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const User = mongoose.model('User');

router.get('/api/current-user', async (req, res) => {
    if (!req.user) {
            res.json(null);
        }
        else {
<<<<<<< HEAD
            const user = await User.findOne({ discordId: req.user.discordId });
            if (!user) {
                res.json(null);
            } else {
                res.json(user);
            }
=======
            res.json({ discordId: req.user.discordId });
>>>>>>> aaronBranch
        }
});

router.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ discordId: id }).populate({
            path: 'statistics.problemHistory',
            model: 'ProblemHistory',
            populate: {
                path: 'problem',
                model: 'Problem'
            }
        });

        if (!user) {
            res.json(null);
        }
        else {
            res.json(user);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});