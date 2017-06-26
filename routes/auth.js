const passport = require('passport');
const authenticationController = require('../controllers/authentication');

module.exports = function(app) {
  app.post('/api/auth/register', authenticationController.register);
  app.post('/api/auth/login', passport.authenticate('local'), authenticationController.login);
};
