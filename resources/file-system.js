const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const UPLOADS_DIR = path.join(ROOT, 'uploads');

module.exports = {
  ROOT,
  UPLOADS_DIR,
};
