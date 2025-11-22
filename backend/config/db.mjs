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

mongoose.model('User', User);