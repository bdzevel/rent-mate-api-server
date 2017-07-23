const errorController = require('../controllers/error-controller.js');

module.exports = function(app) {
  require('./auth')(app);
  require('./api')(app);

  // Final error handler for all uncaught/unhandled errors:
  app.use(errorController.handleUncaughtError);
};
