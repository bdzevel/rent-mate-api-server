const passport = require('passport');
const mustbe = require('mustbe').routeHelpers();

const errorController = require('./error-controller');
const authService = require('../services/auth-service');
const userService = require('../services/user-service');

const ROLES = require('../resources/authorization').ROLES;

const User = global.models.user;

const self = {
  register(req, res) {
    const username = req.body.username.toLowerCase();
    const { password, firstName, lastName } = req.body;
    User.findOne({ username })
      .then(function(user) {
        if (user) {
          return res.status(403).end();
        }
        return authService.hashPassword(password)
          .then(function(hash) {
            const newUser = new User({ username, firstName, lastName, password: hash, roles: [ ROLES.USER ] });
            return userService.save(newUser)
              .then(() => self.login(req, res));
          });
      })
      .catch(errorController.handleError.bind(this, req, res));
  },

  login(req, res) {
    passport.authenticate('local')(req, res, function() {
      const profile = userService.getUserProfile(req.user);
      return res.status(200).json(profile);
    });
  },

  logout(req, res) {
    req.logout();
    return res.status(200).send({ status: 'ok' });
  },

  canPerformAction(action, req, res) {
    // Super ghetto IMO
    return new Promise(function(resolve) {
      mustbe.authorized(action, () => resolve(false))(req, res, () => resolve(true));
    });
  },
};

module.exports = self;
