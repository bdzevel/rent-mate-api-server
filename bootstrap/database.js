const data = require('rent-mate-data');
const winston = require('winston');

const db = {
  connect() {
    return data.connect(process.env.MONGO_URL)
      .then(function(models) {
        global.models = models;
      })
      .catch(function(err) {
        winston.error(' > ERR!', err);
        process.exit(-1);
      });
  },
};

module.exports = db;
