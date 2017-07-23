const mustbe = require('mustbe').routeHelpers();

const userController = require('../controllers/user-controller');
const listingController = require('../controllers/listing-controller');
const propertyController = require('../controllers/property-controller');

const ACTIONS = require('../resources/authorization').ACTIONS;

module.exports = function(app) {
  app.get('/api/user', mustbe.authorized(ACTIONS.READ_OWN_PROFILE), userController.getCurrentUser);
  app.put('/api/user', mustbe.authorized(ACTIONS.WRITE_OWN_PROFILE), userController.updateOwnProfile);

  app.get('/api/listings', mustbe.authorized(ACTIONS.READ_ANY_LISTING), listingController.searchListings);
  app.post('/api/listings', mustbe.authorized(ACTIONS.WRITE_OWN_LISTING), listingController.createListing);
  app.put('/api/listings/:id', mustbe.authorized(ACTIONS.WRITE_OWN_LISTING), listingController.updateListing);

  app.get('/api/properties', mustbe.authorized(ACTIONS.READ_OWN_PROPERTY), propertyController.searchOwnProperties);
  app.get('/api/properties/all', mustbe.authorized(ACTIONS.READ_ANY_PROPERTY), propertyController.searchProperties);
  app.post('/api/properties', mustbe.authorized(ACTIONS.WRITE_OWN_PROPERTY), propertyController.createProperty);
  app.put('/api/properties/:id', mustbe.authorized(ACTIONS.WRITE_OWN_PROPERTY), propertyController.updateProperty);
};
