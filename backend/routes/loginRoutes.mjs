import express from 'express';
import passport from '../config/passport.mjs';

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.user) {
        res.send('login page');
    }
    else {
        res.send('logged in');
    }
})

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
        console.log(`User authenticated: ${req.user.username}`);
        res.redirect('/login');
    }
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        console.log('User logged out')
        res.redirect('/');
    });
});

export default router;