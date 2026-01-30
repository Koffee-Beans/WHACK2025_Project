import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import mongoose from 'mongoose';
import { GoogleGenAI } from "@google/genai";

const User = mongoose.model('User');

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL || '',
    scope: ['identify'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ discordId: profile.id });

        if (!user) {
            user = await User.create({
                discordId: profile.id,
                username: profile.username,
                avatar: profile.avatar,
                statistics: {
                    // more stats later
                }
            });
            console.log(`Created new user: ${user.username}`);
        }
        else {
            user.username = profile.username;
            user.avatar = profile.avatar;
            await user.save();
            console.log(`User logged in: ${user.username}`);
        }
        return done(null, user);
    }
    catch (err) {
        console.error('Error in Discord strategy:', err);
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;