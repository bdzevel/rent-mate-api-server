const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const winston = require('winston');

const authentication = require('./authentication');
const authorization = require('./authorization');
const routes = require('../routes/index');
const cors = require('./cors');

const app = express();
app.use(session({
  resave: false,
  name: 'rent-mate-api-session',
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    path: '/',
    secure: process.env.ENVIRONMENT === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 60, // 60 days
  },
}));
app.use(bodyParser.json());
cors.initialize(app);
authentication.initialize(app);
authorization.initialize();
routes(app);

const port = process.env.PORT || 3000;
app.listen(port);
winston.info(`Finished bootstrapping. Listening on ${port}.`);

module.exports = app;
