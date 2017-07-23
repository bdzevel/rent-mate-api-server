const bcrypt = require('bcrypt');

const User = global.models.user;

const self = {
  login(username, password) {
    return User.findOne({ username: username.toLowerCase() }).lean()
      .then(function(user) {
        if (!user) {
          return null;
        }
        return bcrypt.compare(password, user.password)
          .then(function(isEqual) {
            if (!isEqual) {
              return null;
            }
            return user;
          });
      });
  },

  hashPassword(cleartext) {
    return bcrypt.hash(cleartext, 10);
  },
};

Object.assign(module.exports, self);
