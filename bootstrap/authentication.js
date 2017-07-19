const bcrypt = require('bcrypt');
const passport = require('passport');

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
    return User.findOne({ username: username.toLowerCase() }).lean()
      .then(function(user) {
        if (!user) {
          return done(null, false);
        }
        return bcrypt.compare(password, user.password)
          .then(function(isEqual) {
            if (!isEqual) {
              done(null, false);
              return;
            }
            done(null, user);
          });
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
