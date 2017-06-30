const authController = require('../controllers/auth-controller');

module.exports = function(app) {
  app.post('/auth/register', authController.register);
  app.post('/auth/login', authController.login);
};
