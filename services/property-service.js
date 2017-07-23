const _ = require('lodash');

const Property = global.models.property;

const self = {
  search(options, sort, skip, limit) {
    let query = Property.find(options);
    if (sort) {
      query = query.sort(sort);
    }
    query = query.skip(skip || 0).limit(limit || 50).lean();
    return query;
  },

  create(options) {
    const property = new Property(options);
    return this.save(property);
  },

  update(property, options) {
    const validFields = [ 'description', 'address', 'avatarUrl' ];
    const props = _.pick(options, validFields);
    Object.assign(property, props);
    return this.save(property);
  },

  removePictureFromProperty(picture) {
    if (!picture.targetProperty) {
      return Promise.resolve();
    }

    const property = picture.targetProperty;
    const index = property.pictureUrls.findIndex(u => picture.url === u);
    if (index === -1) {
      return Promise.resolve();
    }

    property.pictureUrls.splice(index, 1);
    if (property.avatarUrl === picture.url) {
      property.avatarUrl = property.pictureUrls.length ? property.pictureUrls[0] : null;
    }
    return this.save(property);
  },

  save(property) {
    return property.save();
  },
};

Object.assign(module.exports, self);
