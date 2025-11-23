import express, { application } from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const User = mongoose.model('User');
const Problem = mongoose.model('Problem');
const ProblemHistory = mongoose.model('ProblemHistory');
const Quiz = mongoose.model('Quiz');

router.get('/api/current-user', async (req, res) => {
    if (!req.user) {
            res.json(null);
        }
        else {
            res.json({ discordId: req.user.discordId });
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

router.get('/api/user/:userid/problems/:problemid', async (req, res) => {
    const { userid, problemid } = req.params;
    try {
        const user = await User.findOne({ discordId: userid }).populate({
            path: 'statistics.problemHistory',
            model: 'ProblemHistory',
            populate: {
                path: 'problem',
                model: 'Problem'
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const problemHistoryEntry = await ProblemHistory.findOne({
            _id: { $in: user.statistics.problemHistory }
        })
        .populate({
            path: 'problem',
            model: 'Problem',
            match: { id: problemid }
        });
        if (!problemHistoryEntry || !problemHistoryEntry.problem) {
            return res.status(404).json({ error: 'Problem history or problem details not found' });
        }
        const problem = problemHistoryEntry;
        const problemDetails = problemHistoryEntry.problem;
        res.json({
            problemHistory: problem,
            problemDetails: problemDetails
        });
    }
    catch (error) {
        console.error('Error fetching user/problem:', error);
        res.status(500).json({ error: 'Failed to fetch user/problem' });
    }
});

router.get('/api/user/:userid/quizzes/:quizid', async (req, res) => {
    const { userid, quizid } = req.params;
    try {
        const user = await User.findOne({ discordId: userid }).populate({
            path: 'statistics.problemHistory',
            model: 'ProblemHistory',
            populate: {
                path: 'problem',
                model: 'Problem'
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const quizEntry = await Quiz.findOne({ id: quizid })
        .populate({
            path: 'problems',
            model: 'Problem'
        });
        if (!quizEntry) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        const quiz = quizEntry;
        res.json({ quiz });
    }
    catch (error) {
        console.error('Error fetching user/quiz:', error);
        res.status(500).json({ error: 'Failed to fetch user/quiz' });
    }
});

router.post('/api/user/:userid/newquiz', async (req, res) => {
    const { userid } = req.params;
    console.log(req.body);
    // problems is an array of Problem ObjectIds (e.g., ['id1', 'id2', ...])
    // choices is an array of strings representing the user's answer (or 'unanswered')
    const { id, problems, choices, score, date } = req.body; 

    const quizData = { id, problems, choices, score, date };

    try {
        // 1. Create the quiz document
        const newQuiz = await Quiz.create(quizData); 

        // 2. Fetch the User and the Problem documents needed for history update
        const user = await User.findOne({ discordId: userid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch all problems in the quiz to get the 'correctAnswer'
        const quizProblems = await Problem.find({ _id: { $in: problems } });
        const problemMap = new Map(quizProblems.map(p => [p._id.toString(), p]));

        // 3. Update or Create ProblemHistory for each problem
        for (let i = 0; i < problems.length; i++) {
            const problemId = problems[i]; // The ObjectId string
            const userChoice = choices[i];
            const problemDetails = problemMap.get(problemId);

            // ... (error handling for problemDetails) ...

            const isCorrect = (userChoice === problemDetails.correctAnswer);
            const isAttempted = (userChoice !== 'unanswered');

            // ✅ CORRECTED QUERY: Find a ProblemHistory document that is referenced by the user
            // AND points to the current problemId.
            let historyEntry = await ProblemHistory.findOne({
                // This ensures the entry belongs to the user AND is for the correct problem
                _id: { $in: user.statistics.problemHistory },
                problem: problemId
            });

            // If history doesn't exist, create it
            if (!historyEntry) {
                // Create the new ProblemHistory document
                historyEntry = await ProblemHistory.create({ problem: problemId });
                
                // Add the new history entry ID to the user's problemHistory array
                // (This only happens on the very first time the user attempts this problem)
                user.statistics.problemHistory.push(historyEntry._id);
            }

            // Update history statistics (This is where the default values are overwritten)
            if (isAttempted) {
                historyEntry.timesAttempted += 1;
            }

            if (isCorrect) {
                historyEntry.timesSolvedCorrectly += 1;
                historyEntry.streak += 1;
            } else {
                // Reset streak on incorrect or unanswered attempt
                historyEntry.streak = 0; 
            }

            // Save the updated ProblemHistory document
            await historyEntry.save();
        }

        // 4. Add the new quiz's ID to the user's statistics.quizHistory
        user.statistics.quizHistory.push(newQuiz._id);
        await user.save({ runValidators: true }); // Save the user with updated history arrays

        // 5. Respond with success
        res.status(201).json({ 
            message: 'Quiz created and user history updated successfully', 
            quizId: newQuiz._id 
        });

    } catch (error) {
        console.error('Error creating quiz or updating user history:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;