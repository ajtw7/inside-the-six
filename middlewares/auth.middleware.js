// checks if user is authenticated, otherwise redirect to login
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }
    next()
}

//  checks if user is not authenticated, otherwise redirect to profile
const isNotAuthenticated = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/profile')
        return
    }
    next()
}

module.exports = {
    isAuthenticated, isNotAuthenticated
};