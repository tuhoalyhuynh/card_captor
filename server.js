// Dependencies
require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const axios = require('axios').default;
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const SECRET_SESSION = process.env.SECRET_SESSION;
// console.log(SECRET_SESSION);
const app = express();

// isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, there making that true

const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialize: true
}

app.use(session(sessionObject));

// Initialize passport and run through middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash
// Using flash throughout app to send temporary messages to user
app.use(flash());

// Messages that will be accessible to every view
app.use((req, res, next) => {
  // Before every route, we sill attach a user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

// Home route
app.get('/', (req, res) => {
  // console.log(res.locals.alerts);
  res.render('main/index', { alerts: res.locals.alerts });
});

// Profile route
app.get('/profile', isLoggedIn, (req, res) => {
  res.render('main/profile');
});

// Auth router
app.use('/auth', require('./routes/auth'));

// Search router
app.use('/search', require('./routes/search'));

// Own router
app.use('/own', require('./routes/own'));

// Want router
app.use('/want', require('./routes/want'));

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;