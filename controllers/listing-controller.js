const errorController = require('./error-controller');
const listingService = require('../services/listing-service');

const Listing = global.models.listing;

const self = {
  searchListings(req, res) {
    listingService.search({ })
      .then(listings => res.status(200).json(listings.toObject()))
      .catch(errorController.handleError.bind(this, req, res));
  },

  createListing(req, res) {
    listingService.create(req.body)
      .then(listing => res.status(200).json(listing.toObject()))
      .catch(errorController.handleError.bind(this, req, res));
  },

  updateListing(req, res) {
    Listing.findById(req.params.id)
      .then(function(listing) {
        if (listing.owner !== req.user._id) {
          res.status(403).end();
          return;
        }
        listingService.update(req.params.id, req.body)
          .then(() => res.status(200).end());
      })
      .catch(errorController.handleError.bind(this, req, res));
  },
};

module.exports = self;
