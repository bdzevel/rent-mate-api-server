const dotenv = require('dotenv');
dotenv.config();

const data = require('rent-mate-data');
data.connect(process.env.MONGO_URL)
.then(function(models) {
    global.models = models;
})
.catch(function(err) {
    console.error(' > ERR!', err);
    process.exit(-1);
});
