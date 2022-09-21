const { Router } = require('express');
const router = new Router();
// const watchlistPlayer = require('../models/watchlist-player.model')


// watchlistAdd.addEventListener(click,  )

router.get('/watchlist', (req, res, next) => {
    // console.log('holaaaaa')
    res.render('watchlist/watchlist')

})

router.post('/new-watchlist', (req, res, next) => {
    console.log('The form data:', req.body)
    

})

router.post('/')

module.exports = router;