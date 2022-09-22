const {
    Router
} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model')
const mongoose = require('mongoose');




router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {
    // console.log('The form data:', req.body)

    const {
        username,
        email,
        password
    } = req.body;

    if (!username || !email || !password) {
        res.render('auth/signup', {
            errorMessage: 'All fields are mandatory. Please provide your username, email and password.'
        })
        return
    }

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            // console.log(`Password hash: ${hashedPassword}`);
            return User.create({
                username,
                email,
                passwordHash: hashedPassword
            });
        })
        .then(userFromDB => {
            console.log('The newest user is: ', userFromDB);
            res.redirect('/userProfile')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', {
                    errorMessage: error.message
                });
            } else if (error.code === 11000) {
                res.status(500).render('auth/signup', {
                    errorMessage: 'Username and email need to be unique. Either username or email is already used.'
                })
            } else {
                next(error)
            }


        });
});

router.get('/userProfile', (req, res, next) => {
    res.render('users/user-profile.hbs')
})



module.exports = router;