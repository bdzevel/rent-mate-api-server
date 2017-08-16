const fs = require('fs');
const path = require('path');
const request = require('request');

const FILE_SYSTEM = require('../resources/file-system');

const self = {
  deleteFiles(fileNames) {
    const tasks = [];
    for (const file of fileNames) {
      tasks.push(new Promise(function(resolve, reject) {
        fs.unlink(path.join(FILE_SYSTEM.UPLOADS_DIR, file), function(err) {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      }));
    }
    return Promise.all(tasks);
  },

  uploadFilesToImageServer(files) {
    const formData = {
      images: files.map(f => ({
        value: fs.createReadStream(path.join(FILE_SYSTEM.UPLOADS_DIR, f.filename)),
        options: {
          filename: f.originalname,
          contentType: f.mimetype,
        },
      })),
    };

    const options = {
      url: `${process.env.IMAGE_SERVER_URL}/api/images`,
      formData,
      headers: {
        Authorization: process.env.IMAGE_SERVER_KEY,
      },
    };
    return new Promise(function(resolve, reject) {
      request.put(options, function(err, response, jsonBody) {
        if (err) {
          return reject(err);
        }
        if (response.statusCode >= 400) {
          return reject(new Error(`Upload failed with ${response.statusCode}: ${response.statusMessage}`));
        }
        const body = JSON.parse(jsonBody);
        body.urls = body.urls.map(url => `${process.env.IMAGE_SERVER_URL}${url}`);
        return resolve(body);
      });
    });
  },
};

Object.assign(module.exports, self);
