const winston = require('winston');

const self = {
  register(req, res) {
    winston.debug(' > ', req.body);
    res.status(200).json({ status: 'success' });
  },

  login(req, res) {
    winston.debug(' > ', req.body);
    res.status(200).json({ status: 'success' });
  },
};

module.exports = self;
