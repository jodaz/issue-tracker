const PORT      = process.env.PORT || 4000;
const NODE_ENV  = process.env.NODE_ENV || 'development';

let mongoURI    = '';

if (NODE_ENV === 'production') {
  try {
    mongoURI = require('./keys-prod.js');
  } catch(err) {
    console.log(`${err}`);
    process.exit(1);
  }
} else {
  mongoURI = require('./keys-dev.js');
};

module.exports = {
  NODE_ENV,
  PORT,
  ...mongoURI
};
