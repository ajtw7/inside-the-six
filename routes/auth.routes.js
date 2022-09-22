const {
    Router
} = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model')
const mongoose = require('mongoose');
const {isAuthenticated, isNotAuthenticated} = require('../middlewares/auth.middleware')




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
            res.redirect('/profile')
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


// routes for login page
router.get('/login', (req, res, next) => {
    res.render('auth/login')

})

router.post('/login', (req, res, next) => {
    console.log(req.body)
    const {
        username,
        password
    } = req.body;

    User.findOne({
            username
        })
        .then(foundUser => {
            console.log(foundUser);
            if (!foundUser) {
                res.send('no user matching')
                return
            }

            const isValidPassword = bcryptjs.compareSync(password, foundUser.passwordHash)

            if (!isValidPassword) {
                res.send('incorrect password');
                return
            }

            req.session.user = foundUser

            res.redirect('/profile')
        })
        .catch(err => res.send(err))


})


// User profile
router.get('/profile', isAuthenticated, (req, res, next) => {
    User.find({
        _id: req.session.user._id
    })
    .populate({
        path: 'watchlistPlayers'
    })
    .then(foundUser => {
        const thisUser = foundUser[0]
        console.log(foundUser[0].username, "FOUND!!!!!!")
        res.render('users/user-profile', {thisUser: thisUser})
    })
    .catch(err => console.log(err))
    

})



module.exports = router;