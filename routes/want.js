// Dependencies
const express = require('express');
const passport = require('../config/ppConfig');
const db = require('../models');
const axios = require('axios').default;
const router = express.Router();

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

router.get('/', (req, res) => {
    db.want.findAll({
        where: { userId: res.locals.currentUser.id }
    })
    .then((cards) => {
        console.log(cards)
        res.render('want/index', { cards })
    })
})

module.exports = router;