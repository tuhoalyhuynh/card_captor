// Dependencies
const express = require('express');
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios').default;
const router = express.Router();

// POST route to add to wants table
router.post('/', (req, res) => {
    db.want.findOrCreate({
      where: {
          userId: res.locals.currentUser.id,
          apiId: req.body.apiId,
          name: req.body.name,
          imageUrl: req.body.imageUrl
      }
    })
    .then((_project) => {
      res.redirect('/want')
    })
})

// GET route for /want
router.get('/', (req, res) => {
    db.want.findAll({
        where: { userId: res.locals.currentUser.id }
    })
    .then((cards) => {
        console.log(cards)
        res.render('want/index', { cards })
    })
})

// GET route for /want/show
router.get('/:id', (req, res) => {
    axios.get(`https://api.pokemontcg.io/v1/cards?id=${req.params.id}
    `).then(response => {
        if (response.status === 200){
        //   console.log(response.data.cards)
          res.render('want/show', { card: response.data.cards })
        }
    })
    .catch(err => {
        console.log(err);
    })
})

// DELETE route to remove from wants table
router.delete('/', function (req, res) {
    // console.log(req.body);
    db.want.destroy({
        where: {
            userId: res.locals.currentUser.id,
            apiId: req.body.apiId,
            name: req.body.name,
            imageUrl: req.body.imageUrl
        }
    })
    .then((_project) => {
        res.redirect('/want')
    })
})


module.exports = router;