const {
    Router
} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model')




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
        .catch(error => next(error));
});

router.get('/userProfile', (req, res, next) => {
    res.render('users/user-profile.hbs')
})



module.exports = router;