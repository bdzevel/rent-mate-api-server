const propertyService = require('./property-service');

const Picture = global.models.picture;

const self = {
  delete(id) {
    return Picture.findById(id).populate('targetProperty')
      .then(function(picture) {
        return propertyService.removePictureFromProperty(picture)
          .then(() => picture.remove());
      });
  },

  save(picture) {
    return picture.save();
  },
};

Object.assign(module.exports, self);
