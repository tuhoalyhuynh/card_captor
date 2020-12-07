const express = require('express');
const passport = require('../config/ppConfig');
const db = require('../models');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

// Profile route
router.get('/', isLoggedIn, (req, res) => {
    res.render('profile/index', { user: res.locals.currentUser });
});
  
// Profile edit route
router.get('/edit', isLoggedIn, (req, res) => {
    res.render('profile/edit', { user: res.locals.currentUser })
})

// PUT route for profile edits
router.put('/', isLoggedIn, (req, res) => {
    db.user.findOne({
      where: { id: res.locals.currentUser.id }
    })
    .then((user) => {
      user.update({
          name: req.body.name,
          email: req.body.email
      })
    })
    .then((_user) => {
        res.redirect('/profile')
    })
})

module.exports = router;