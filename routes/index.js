module.exports = function(app) {
  require('./auth')(app);
  require('./api')(app);
};
