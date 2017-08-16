const multer = require('multer');

const authController = require('./auth-controller');
const errorController = require('./error-controller');
const uploadsService = require('../services/uploads-service');
const propertyService = require('../services/property-service');

const Property = global.models.property;

const ACTIONS = require('../resources/authorization').ACTIONS;
const FILE_SYSTEM = require('../resources/file-system');

const storage = multer.diskStorage({
  destination: FILE_SYSTEM.UPLOADS_DIR,
});
const upload = multer({
  storage,
});

function findPropertyIfAuthorized(userId, propertyId, req, res) {
  return Property.findById(propertyId)
    .then(function(property) {
      // Check if user can perform this action
      if (property.owner !== userId) {
        return authController.canPerformAction(ACTIONS.WRITE_ANY_PROPERTY, req, res)
          .then(isAuthorized => ({ property, isAuthorized }));
      }
      return { property, isAuthorized: true };
    });
}

const self = {
  searchOwnProperties(req, res) {
    const userId = req.user._id;
    propertyService.search({ owner: userId })
      .then(properties => res.status(200).json(properties))
      .catch(errorController.handleError.bind(this, req, res));
  },

  searchProperties(req, res) {
    propertyService.search({ })
      .then(properties => res.status(200).json(properties))
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
    findPropertyIfAuthorized(req.user._id, req.params.id, req, res)
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

  upload: upload.array('images', 12),

  handleUploadedPictures(req, res) {
    if (!req.files || !req.files.length) {
      res.status(200).send({ status: 'ok' });
      return;
    }
    findPropertyIfAuthorized(req.user._id, req.params.propId, req, res)
      .then(({ property, isAuthorized }) => {
        const fileNames = req.files.map(f => f.filename);
        if (!isAuthorized) {
          uploadsService.deleteFiles(fileNames);
          res.status(403).end();
          return null;
        }

        return uploadsService.uploadFilesToImageServer(req.files)
          .then(function(response) {
            uploadsService.deleteFiles(fileNames);
            propertyService.addPicturesToProperty(property, response.urls)
              .then(() => res.status(200).send({ status: 'ok' }));
          });
      })
      .catch(errorController.handleError.bind(this, req, res));
  },

  deletePicture(req, res) {
    res.status(500).send({ status: 'not_implemented' });
  },
};

module.exports = self;
