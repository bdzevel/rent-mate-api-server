const _ = require('lodash');

const authService = require('./auth-service');

const ROLES = require('../resources/authorization').ROLES;

const User = global.models.user;

function getValidChangeableRoles(roles) {
  if (!roles) {
    return undefined;
  }
  const validChangeableRoles = [ ROLES.LANDLORD ];
  return _.pick(roles, validChangeableRoles);
}

function mergeRoles(user, roles) {
  if (!roles) {
    return undefined;
  }
  const newRoles = user.roles;
  for (const role in roles) {
    if (!roles[role]) {
      const index = newRoles.findIndex(r => r === role);
      if (index !== -1) {
        newRoles.splice(index, 1);
      }
    } else {
      newRoles.push(role);
    }
  }
  return newRoles;
}

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
    const setRoles = getValidChangeableRoles(options.roles);
    const passHashTask = options.password ? authService.hashPassword(options.password) : Promise.resolve();
    return Promise.all([ passHashTask, User.findById(id) ])
      .then(([ password, user ]) => {
        const roles = mergeRoles(user, setRoles);
        if (roles) {
          properties.roles = roles;
        }
        if (password) {
          properties.password = password;
        }
        Object.assign(user, properties);
        return this.save(user);
      });
  },

  toggleRoles(userId, roles) {
    const setRoles = getValidChangeableRoles(roles);
    return User.findById(userId)
      .then((user) => {
        const newRoles = mergeRoles(user, setRoles);
        user.roles = newRoles;
        return this.save(user);
      });
  },

  save(user) {
    return user.save();
  },
};

Object.assign(module.exports, self);
