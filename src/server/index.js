const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

let data = [];

const app = express();

app.use(morgan('tiny '));
app.use(express.json());
app.use('/', express.static('covid19', {index: 'main.html'}));

app.get('')

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