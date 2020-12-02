// Dependencies
const express = require('express');
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios').default;
const router = express.Router();

router.get('/results?:name', (req, res) => {
    axios.get(`https://api.pokemontcg.io/v1/cards?name=${req.query.name}
    `).then(response => {
        if (response.status === 200){
          console.log(response.data.cards)
          res.render('search/index', { 
              cards: response.data.cards,
              name: req.query.name
            }
        )}
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/:id', (req, res) => {
    axios.get(`https://api.pokemontcg.io/v1/cards?id=${req.params.id}
    `).then(response => {
        if (response.status === 200){
          console.log(response.data.cards)
          res.render('search/show', { card: response.data.cards })
        }
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;
