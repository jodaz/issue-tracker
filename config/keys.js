if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys-produc.js');
} else {
  module.exports = require('./keys-dev.js');
}