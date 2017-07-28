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
          let output = { status: 'unauthorized' };
          if (!req.user) {
            output = { status: 'unauthenticated' };
          }
          res.status(403).send(output);
        });
      });

      config.activities(function(activities) {
        const ACTIONS = CONSTANTS.ACTIONS;
        const ACTIONS_PER_ROLE = CONSTANTS.ACTIONS_PER_ROLE;
        for (const key in ACTIONS) {
          const action = ACTIONS[key];
          activities.can(action, function(identity, params, cb) {
            if (!identity.user || !identity.user.roles.some(r => ACTIONS_PER_ROLE[r].some(a => a === action))) {
              return cb(null, false);
            }
            return cb(null, true);
          });
        }
      });
    });
  },
};

module.exports = auth;
