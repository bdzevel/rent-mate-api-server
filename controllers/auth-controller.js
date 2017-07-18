const bcrypt = require('bcrypt');
const winston = require('winston');
const passport = require('passport');

const userService = require('../services/user-service');

const ROLES = require('../resources/authorization').ROLES;

const User = global.models.user;

const self = {
  register(req, res) {
    const { username, password, firstName, lastName } = req.body;
    User.findOne({ username })
      .then(function(user) {
        if (user) {
          return res.status(403).end();
        }
        return bcrypt.hash(password, 10)
          .then(function(hash) {
            const newUser = new User({ username, firstName, lastName, password: hash, roles: [ ROLES.USER ] });
            return userService.saveUser(newUser)
              .then(usr => userService.getUserProfile(usr))
              .then(profile => res.status(200).json(profile));
          })
          .catch(function(err) {
            winston.error('Error! ', err);
            return res.status(500).end();
          });
      })
      .catch(e => winston.error(e));
  },

  login(req, res) {
    passport.authenticate('local')(req, res, function(err, user) {
      if (!user) {
        return res.status(403).end();
      }
      const profile = userService.getUserProfile(user);
      return res.status(200).json(profile);
    });
  },

  logout(req, res) {
    req.logout();
    return res.status(200).end();
  },
};

module.exports = self;
