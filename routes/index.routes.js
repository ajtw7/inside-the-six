const router = require("express").Router();
const axios = require('axios');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Get Leagues page
router.get('/leagues', (req, res, next) => {

  axios({
      method: 'get',
      url: 'https://api.football-data.org/v4/competitions/',
      headers: {
        "X-Auth-Token": "bd8fb1ba95854895b437b0e5ffc4bf1a"
      }
    })

    // axios.get('https://api.football-data.org/v4/competitions/CL/matches', {
    //     headers: {
    //       "X-Auth-Token": "bd8fb1ba95854895b437b0e5ffc4bf1a"
    //     }
    //   })

    .then((axiosResponse) => { //scoping issue
      console.log(axiosResponse.data.competitions[0])
      res.render('leagues', {
        stats: axiosResponse.data.competitions
      })
    })
    .catch(err => console.log(err))

  // res.render('leagues')
});

// Get Teams from a specific league 
router.get('/leagues/:leagueCode/teams', (req, res, next) => {
  const leagueCode = req.params.leagueCode
  axios({
      method: 'get',
      url: `https://api.football-data.org/v4/competitions/${leagueCode}/teams`,
      headers: {
        "X-Auth-Token": "bd8fb1ba95854895b437b0e5ffc4bf1a"
      }
    })
    .then(axiosResponse => {
      console.log(axiosResponse.data.teams[0])
      res.render('league-teams', {
        leagueTeam: axiosResponse.data.teams
      })
    })
    .catch(err => console.log(err))
})

// Get entire roster from a specific team
router.get('/teams/:teamCode/roster', (req, res, next) => {
  const teamCode = req.params.teamCode
  axios({
      method: 'get',
      url: `https://api.football-data.org/v4/teams/${teamCode}`,
      headers: {
        "X-Auth-Token": "bd8fb1ba95854895b437b0e5ffc4bf1a"
      }
    })
    .then(axiosResponse => {
      console.log(axiosResponse.data)
      res.render('roster', {
        team: axiosResponse.data
      })
    })
    .catch(err => console.log(err))
})

// Get  All Teams Page
router.get('/all-teams', (req, res, next) => {
  axios({
      method: 'get',
      url: 'https://api.football-data.org/v4/teams?limit=100',
      headers: {
        "X-Auth-Token": "bd8fb1ba95854895b437b0e5ffc4bf1a"
      }
    })
    .then(axiosResponse => {
      console.log(axiosResponse.data.teams[0])
      res.render('all-teams', {
        teams: axiosResponse.data.teams
      })
    })
    .catch(err => console.log(err))
})

module.exports = router;