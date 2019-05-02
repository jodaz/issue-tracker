const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Issue model
const Issue = require('../../models/Issue');

router.post('/', (req, res) => {

  const newIssue = new Issue({
    title: req.body.title,
    text: req.body.text
  });

  newIssue.save().then(issue => res.json(issue));
});

module.exports = router;
