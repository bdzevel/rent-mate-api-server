const passport = require('passport');

const authService = require('../services/auth-service');

const User = global.models.user;
const LocalStrategy = require('passport-local').Strategy;

function configurePassport() {
  passport.serializeUser(function(user, done) {
    done(null, user._id.toString());
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).lean()
      .then(user => done(null, user));
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    authService.login(username, password)
      .then(function(user) {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
  }));
}

const auth = {
  initialize(app) {
    configurePassport();
    app.use(passport.initialize());
    app.use(passport.session());
  },
};

module.exports = auth;
