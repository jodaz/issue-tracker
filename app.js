const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const testRunner = require('./test-runner');

const issues = require('./routes/api/issues');

const app = express();

// Body parser and helmet middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => { console.log('MongoDB connected') })
  .catch((error) => { console.log(error) });

// Routing
app.use('/api/issues', issues);

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