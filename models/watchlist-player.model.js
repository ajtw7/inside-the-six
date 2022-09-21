const {
    Schema,
    model
} = require('mongoose');

const watchlistPlayerSchema = new schema({
    fullName: String,
    currentTeam: String,
    position: String,
    shirtNumber: Number,

})

const WatchlistPlayer = model('WatchlistPlayer', watchlistPlayerSchema)

module.exports = WatchlistPlayer;