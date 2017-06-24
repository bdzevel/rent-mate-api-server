const dotenv = require('dotenv');
dotenv.config();

const data = require('rent-mate-data');
data.connect(process.env.MONGO_URL)
.then(function(models) {
    global.models = models;
    const User = global.models.user;
    const me = new User({ username: 'bdzevel', password: '123456', firstName: 'Boris', lastName: 'Dzevel' });
    return me.save();
})
.catch(function(err) {
    console.error(' > ERR!', err);
    process.exit(-1);
});
