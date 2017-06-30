const express = require('express');
const session = require('express-session');

const authentication = require('./authentication');
const authorization = require('./authorization');
const routes = require('../routes/index');

const app = express();
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    path: '/',
    secure: process.env.ENVIRONMENT === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 60, // 60 days
  },
}));
authentication.initialize(app);
authorization.initialize();
routes(app);
app.listen(process.env.PORT || 3000);

module.exports = app;
