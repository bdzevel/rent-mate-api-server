const _ = require('lodash');

const Listing = global.models.listing;

const self = {
  search(options, sort, skip, limit) {
    let query = Listing.find(options);
    if (sort) {
      query = query.sort(sort);
    }
    query = query.skip(skip || 0).limit(limit || 50).lean();
    return query;
  },

  create(options) {
    const listing = new Listing(options);
    return this.save(listing);
  },

  update(id, options) {
    const validFields = [ 'broken' ];
    const properties = _.pick(options, validFields);
    return Listing.findById(id)
      .then(function(listing) {
        Object.assign(listing, properties);
        return this.save(listing);
      });
  },

  save(listing) {
    return listing.save();
  },
};

Object.assign(module.exports, self);
