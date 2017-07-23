const winston = require('winston');

const self = {
  handleError(req, res, err) {
    winston.error('Caught error: ', err.stack);
    res.status(500).end();
  },

  // eslint-disable-next-line
  handleUncaughtError(err, req, res, next) {
    winston.error('Uncaught error: ', err.stack);
    res.status(500).end();
  },
};

module.exports = self;
