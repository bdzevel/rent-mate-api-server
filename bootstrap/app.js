const winston = require('winston');
const dotenv = require('dotenv');

const db = require('./database');

dotenv.config();

winston.level = process.env.TRACE_LEVEL || 'info';

db.connect()
.then(function() {
  const app = require('./web-server');
  const auth = require('./authentication');
  auth.initialize(app);
  app.listen(process.env.PORT || 3000);
})
.catch(err => winston.error(' >> ERR! ', err));
