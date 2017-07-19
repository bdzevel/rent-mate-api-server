const winston = require('winston');
const corslib = require('cors');

const allowedOrigins = [
  process.env.APP_SERVER_URL,
];

const config = {
  credentials: true,

  origin(reqOrigin, callback) {
    if (allowedOrigins.some(o => o === reqOrigin)) {
      return callback(null, true);
    }

    winston.debug(`Request origin ${reqOrigin} not allowed`);
    return callback(null, false);
  },
};

const cors = {
  initialize(app) {
    app.use(corslib(config));
  },
};

module.exports = cors;
