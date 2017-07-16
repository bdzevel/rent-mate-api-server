const userService = require('../services/user-service');

const self = {
  getCurrentUser(req, res) {
    const profile = userService.getUserProfile(req.user);
    res.status(200).json(profile);
  },
};

module.exports = self;
