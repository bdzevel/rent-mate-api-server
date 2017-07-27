const authController = require('./auth-controller');
const errorController = require('./error-controller');
const propertyService = require('../services/property-service');

const Property = global.models.property;

const ACTIONS = require('../resources/authorization').ACTIONS;

const self = {
  searchOwnProperties(req, res) {
    const userId = req.user._id;
    propertyService.search({ _id: userId })
      .then(properties => res.status(200).json(properties.toObject()))
      .catch(errorController.handleError.bind(this, req, res));
  },

  searchProperties(req, res) {
    propertyService.search({ })
      .then(properties => res.status(200).json(properties.toObject()))
      .catch(errorController.handleError.bind(this, req, res));
  },

  createProperty(req, res) {
    const property = req.body;
    let authorizationCheckTask = Promise.resolve(true);
    if (!property.owner) {
      property.owner = req.user._id;
    } else if (property.owner !== req.user._id.toString()) {
      authorizationCheckTask = authController.canPerformAction(ACTIONS.WRITE_ANY_PROPERTY, req, res);
    }
    authorizationCheckTask
      .then(function(isAuthorized) {
        if (!isAuthorized) {
          res.status(403).end();
          return null;
        }

        return propertyService.create(property)
          .then(p => res.status(200).json(p.toObject()));
      })
      .catch(errorController.handleError.bind(this, req, res));
  },

  updateProperty(req, res) {
    Property.findById(req.params.id)
      .then(function(property) {
        // Check if user can perform this action
        if (property.owner !== req.user._id) {
          return authController.canPerformAction(ACTIONS.WRITE_ANY_PROPERTY, req, res)
            .then(isAuthorized => ({ property, isAuthorized }));
        }
        return { property, isAuthorized: true };
      })
      .then(({ property, isAuthorized }) => {
        if (!isAuthorized) {
          res.status(403).end();
          return null;
        }
        return propertyService.update(property, req.body)
          .then(() => res.status(200).send({ status: 'ok' }));
      })
      .catch(errorController.handleError.bind(this, req, res));
  },
};

module.exports = self;
