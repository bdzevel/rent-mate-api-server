const _ = require('lodash');

const authService = require('./auth-service');

const User = global.models.user;

const self = {
  getUserProfile(user) {
    if (!user) {
      return { isAuthenticated: false };
    }
    const outputFields = [ 'username', 'firstName', 'lastName', 'roles' ];
    const profile = _.pick(user, outputFields);
    profile.isAuthenticated = true;
    return profile;
  },

  update(id, options) {
    const validFields = [ 'firstName', 'lastName' ];
    const properties = _.pick(options, validFields);
    const passHashTask = options.password ? authService.hashPassword(options.password) : Promise.resolve();
    return Promise.all([ passHashTask, User.findById(id) ])
      .then(([ password, user ]) => {
        properties.password = password;
        Object.assign(user, properties);
        return this.save(user);
      });
  },

  save(user) {
    return user.save();
  },
};

Object.assign(module.exports, self);
