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

module.exports = model('WatchlistPlayer', watchlistPlayerSchema)