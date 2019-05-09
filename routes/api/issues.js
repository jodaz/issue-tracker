const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Issue model
const Issue = require('../../models/Issue');

// @route   POST '/api/issues/:project_name'
// @desc    Creates new issue
router.post('/', (req, res) => {

  const newIssue = new Issue({
    title: req.body.issue_title,
    text: req.body.issue_text,
    created_by: req.body.created_by,
    assigned_to: req.body.assigned_to,
    status_text: req.body.status_text
  });

  newIssue.save()
    .then(issue => res.json(issue))
    .catch(error => res.json({'error': 'Missing required fields'}));
});

module.exports = router;
