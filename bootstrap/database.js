const data = require('rent-mate-data');

const db = {
  connect() {
    return data.connect(process.env.MONGO_URL)
      .then(function(models) {
        global.models = models;
      });
  },
};

module.exports = db;
