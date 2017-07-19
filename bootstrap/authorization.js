const mustbe = require('mustbe');

const CONSTANTS = require('../resources/authorization');

const auth = {
  initialize() {
    mustbe.configure(function(config) {
      config.routeHelpers(function(rh) {
        rh.getUser(function(req, cb) {
          cb(null, req.user);
        });

        rh.notAuthorized(function(req, res) {
          res.status(403).end();
        });
      });

      config.activities(function(activities) {
        const ACTIONS_PER_ROLE = CONSTANTS.ACTIONS_PER_ROLE;
        for (const role in ACTIONS_PER_ROLE) {
          for (const action of ACTIONS_PER_ROLE[role]) {
            activities.can(action, function(identity, params, cb) {
              if (!identity.user || !identity.user.roles.some(r => r === role)) {
                return cb(null, false);
              }
              return cb(null, true);
            });
          }
        }
      });
    });
  },
};

module.exports = auth;
