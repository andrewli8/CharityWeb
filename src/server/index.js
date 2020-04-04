const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
require('./auth.js');

let data = [];

const app = express();
app.use(morgan('tiny'));
app.use(express.static('public', {index: 'main.html'}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/'));

app.get('/data', (req, res) => res.send(data));
app.post('/data', (req, res) => {
    data.push(req.body);
    res.send();
});

app.listen(1919);