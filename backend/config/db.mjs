import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

const User = new mongoose.Schema({
	discordId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatar: { type: String },
    statistics: {
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