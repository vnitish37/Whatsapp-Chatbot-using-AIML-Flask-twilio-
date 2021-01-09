const express = require('express');
const bcrypt = require('bcrypt')
const uuid = require('uuid-apikey');
const passport = require('passport');

const Routes = express();

//modles
const UserDetails = require('../models/user')

Routes.get('/', (req, res, next) => {
    res.render('home')
});

Routes.get('/register', function(req, res, next) {
    res.render('register')
});

Routes.post('/register', (req, res, next) => {
    console.log(req.body)
    const { name, email, password, password2 } = req.body;
    const errors = [];

    const UUID = uuid.create().uuid
    const apikey = uuid.create().apiKey




    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Enter Your All Your Details' })
    }
    if (password !== password) {
        errors.push({ msg: 'Your password Does not Matched' })
    }
    if (password.length < 6) {
        errors.push({ msg: 'Your password Should be 6 char' })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        UserDetails.findOne({ email: email }).then(User => {
            if (User) {
                errors.push({ msg: 'email id present in database' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new UserDetails({
                    name,
                    email,
                    password,
                    password2,
                    UUID,
                    apikey
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err)
                        } else {
                            newUser.password = hash;
                        }
                        newUser.save(function(err, save) {
                            if (err) {
                                throw err
                            }
                            console.log(newUser)
                            req.flash('success_msg', 'YOU ARE NOW LOGIN ');
                            res.redirect('/login')
                        })

                    })
                })
            }
        })
    }
});


Routes.get('/login', (req, res, next) => {
    res.render('login')
});

Routes.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/console/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


module.exports = Routes;