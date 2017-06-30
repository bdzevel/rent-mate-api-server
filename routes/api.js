const mustbe = require('mustbe').routeHelpers();

const userController = require('../controllers/user-controller');

const ACTIONS = require('../resources/authorization').ACTIONS;

module.exports = function(app) {
  app.get('/api/user', mustbe.authorized(ACTIONS.READ_OWN_PROFILE), userController.getCurrentUser);
};
