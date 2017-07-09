const bcrypt = require('bcrypt');
const winston = require('winston');
const passport = require('passport');

const userService = require('../services/user-service');

const ROLES = require('../resources/authorization').ROLES;

const User = global.models.users;

const self = {
  register(req, res) {
    const { username, password, firstName, lastName } = req.body;
    User.findOne({ username })
      .then(function(user) {
        if (user) {
          return res.status(403).end();
        }
        return bcrypt.hash(password)
          .then(function(hash) {
            const newUser = new User({ username, firstName, lastName, password: hash, roles: [ ROLES.USER ] });
            return userService.saveUser(newUser)
              .then(function() {
                return res.status(200).end();
              });
          })
          .catch(function(err) {
            winston.error('Error! ', err);
            return res.status(500).end();
          });
      });
  },

  login(req, res) {
    passport.authenticate('local', function(err, user) {
      if (!user) {
        return res.status(403).end();
      }
      return res.status(200).end();
    })(req, res);
  },
};

module.exports = self;
