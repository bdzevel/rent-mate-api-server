const errorController = require('./error-controller');
const userService = require('../services/user-service');

const self = {
  getCurrentUser(req, res) {
    const profile = userService.getUserProfile(req.user);
    res.status(200).json(profile);
  },

  updateOwnProfile(req, res) {
    userService.update(req.user._id, req.body)
      .then(() => res.status(200).end())
      .catch(errorController.handleError.bind(this, req, res));
  },

  toggleRoles(req, res) {
    userService.toggleRoles(req.user._id, req.body)
      .then(() => res.status(200).end())
      .catch(errorController.handleError.bind(this, req, res));
  },
};

module.exports = self;
