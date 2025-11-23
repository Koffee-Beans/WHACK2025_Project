import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const ProblemHistory = new mongoose.Schema({
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    timesAttempted: { type: Number, default: 0 },
    timesSolvedCorrectly: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
});

const Quiz = new mongoose.Schema({
    id: { type: String },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true }],
    choices: [String],
    score: { type: Number },
    date: { type: Date, default: Date.now }
});

const User = new mongoose.Schema({
	discordId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatar: { type: String },
    statistics: {
        problemHistory: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProblemHistory' }] , default: [] }, // problem history using problemhistory schema
        quizHistory: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }], default: [] },
        difficultyLevel: { type: Number, default: 5 }, // difficulty level, average difficulty of problems to start with
        prevDifficultyLevel: { type: Number, default: null },
        rd: { type: Number, default: 5 }, // rd, kinda like tetrio's rd
        recentRate: { type: Number, default: undefined }, // recent rate on problems
        // more stats here later
    },
});

const Problem = new mongoose.Schema({
    problem: { type: String, required: true, unique: true }, // problem statement
    answers: { // answer choices
        a: { type: String },
        b: { type: String },
        c: { type: String },
        d: { type: String },
        e: { type: String },
    },
    correctAnswer: { type: String }, // correct answer (still need to scrape)
    solutions: [ String ], // solutions
    year: [ Number ],
    level: [ Number ],
    version: [ String ],
    number: [ Number ],
    category: { // what style of problem it is (need to categorize, maybe using gemini)
        alg: { type: Boolean, default: false },
        combo: { type: Boolean, default: false },
        geo: { type: Boolean, default: false },
        nt: { type: Boolean, default: false },
    }
});

mongoose.model('User', User);
mongoose.model('Problem', Problem);
mongoose.model('ProblemHistory', ProblemHistory);
mongoose.model('Quiz', Quiz);