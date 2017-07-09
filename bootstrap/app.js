const winston = require('winston');
const dotenv = require('dotenv');

const db = require('./database');

dotenv.config();

winston.level = process.env.TRACE_LEVEL || 'info';

db.connect()
  .then(() => require('./web-server'))
  .catch(err => winston.error(' >> ERR! ', err));
