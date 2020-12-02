// Dependencies
const express = require('express');
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios').default;
const router = express.Router();

router.post('/', (req, res) => {
    db.own.findOrCreate({
      where: {
          userId: res.locals.currentUser.id,
          apiId: req.body.apiId,
          name: req.body.name,
          imageUrl: req.body.imageUrl
      }
    })
    .then((_project) => {
      res.redirect('/own')
    })
})

router.get('/', (req, res) => {
    db.own.findAll({
        where: { userId: res.locals.currentUser.id }
    })
    .then((cards) => {
        // console.log(cards)
        res.render('own/index', { cards })
    })
})

router.get('/:id', (req, res) => {
    axios.get(`https://api.pokemontcg.io/v1/cards?id=${req.params.id}
    `).then(response => {
        if (response.status === 200){
        //   console.log(response.data.cards)
          res.render('own/show', { card: response.data.cards })
        }
    })
    .catch(err => {
        console.log(err);
    })
})

router.delete('/', function (req, res) {
    console.log(req.body);
    db.own.destroy({
        where: {
            userId: res.locals.currentUser.id,
            apiId: req.body.apiId,
            name: req.body.name,
            imageUrl: req.body.imageUrl
        }
    })
    .then((_project) => {
        res.redirect('/own')
    })
})

module.exports = router;