const { Router } = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const UserModel = require('../models/User.model');
const router = new Router();
const User = require('../models/User.model');
const WatchlistPlayer = require('../models/watchlist-player.model');
// const watchlistPlayer = require('../models/watchlist-player.model')


// watchlistAdd.addEventListener(click,  )

router.get('/watchlist', (req, res, next) => {
    // console.log('holaaaaa')
    res.render('watchlist/watchlist')

})

router.post('/new-watchlist', isAuthenticated, (req, res, next) => {
    console.log('The form data:', req.body)
    console.log('user', req.session.user)

    const fullName = req.body.fullname;
    const currentTeam = req.body.currentTeam;
    const position = req.body.position;
    const shirtNumber = req.body.shirtNumber;

WatchlistPlayer.create({
    fullName, currentTeam, position, shirtNumber

})
    .then((newPlayer) => {
        console.log(newPlayer._id, 'playerid')
        console.log(req.session.user._id, 'userid')
        return User.findByIdAndUpdate(req.session.user._id, 
            {
                $addToSet: {watchlistPlayers: newPlayer._id}
            }, { new: true })
    })
    .then(updatedUser => {
        console.log('updated user', updatedUser)
        res.redirect('/profile')
    })
    .catch(err => console.log(err))

})

router.get('/players/:playerId/delete', (req, res, next) => {
    const myPlayerId = req.params.playerId

    WatchlistPlayer.findByIdAndDelete(myPlayerId)
    .then(deletedPlayer => {
        console.log(deletedPlayer)
        res.redirect('/profile')
    })
})

module.exports = router;