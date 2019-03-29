const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = require('./config/keys').mongoURI;
const testRunner = require('./test-runner');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => { console.log('MongoDB connected') })
  .catch((error) => { console.log(error) });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);

  if (process.env.NODE_ENV === 'test') {
    console.log('Running tests...');
    setTimeout(() => {
      try {
        testRunner.run();
      } catch(error) {
        console.log('Test are not valid:', error);
      }
    }, 1500);
  }
});

module.exports = app;