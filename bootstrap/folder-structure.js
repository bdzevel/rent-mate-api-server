const fs = require('fs');

const CONSTANTS = require('../resources/file-system');

function uploadFolderExists() {
  return new Promise(function(resolve) {
    fs.access(CONSTANTS.UPLOADS_DIR, function(err) {
      if (err) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
}

function createUploadFolder() {
  return new Promise(function(resolve) {
    fs.mkdir(CONSTANTS.UPLOADS_DIR, resolve);
  });
}

module.exports = {
  initialize() {
    return uploadFolderExists()
      .then(function(exists) {
        if (exists) {
          return Promise.resolve();
        }
        return createUploadFolder();
      });
  },
};
