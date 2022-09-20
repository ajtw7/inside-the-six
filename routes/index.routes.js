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

// Get Players Page

router.get('/leagues/teams', (req, res, next) => {
  axios({
      method: 'get',
      url: "https://api.football-data.org/v4/competitions/PL/teams",
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


module.exports = router;