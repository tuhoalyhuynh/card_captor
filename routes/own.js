// Dependencies
const express = require('express');
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios').default;
const router = express.Router();

router.post('/', (req, res) => {
    let cardId = null;
    db.card.findOrCreate({
      where: {
          apiId: req.body.apiId,
          name: req.body.name,
          imageUrl: req.body.imageUrl
      }
    }).then((card) => {
      cardId = card[0].id;
      console.log(cardId);
      console.log(res.locals.currentUser.id);
    })
    .then((_project) => {
        db.own.findOrCreate({
            where: {
                userId: res.locals.currentUser.id,
                cardId: cardId,
            }
        })
    })
    .then((_project) => {
      res.redirect('/own')
    })
})

router.get('/', (req, res) => {
    db.user.findOne({
        where: { id: res.locals.currentUser.id },
        include: [db.card],
    })
    .then((user) => {
        console.log(user.cards)
        res.render('own/index', { cards: user.cards })
    })
})

module.exports = router;