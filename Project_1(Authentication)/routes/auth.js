const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register',{ user: req.user, errors: req.flash('error')});
});

router.post('/register', (req, res) => {
    const { username, email, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', { user: req.user,errors, username, email, password, password2 });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', { errors, username, email, password, password2 });
                } else {
                    const newUser  = new User({ username, email, password });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser .password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser .password = hash;
                            newUser .save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/auth/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { user: req.user, error: req.flash('error')});
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });
});

module.exports = router;