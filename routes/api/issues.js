const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Issue model
const Issue = require('../../models/Issue');

// Project model
const Project = require('../../models/Project');

// @route   POST '/api/issues/:project_name'
// @desc    Creates new issue
router.post('/api/issues/:project_name', (req, res) => {
  const projectName = req.params.project_name;

  const newIssue = new Issue({
    title: req.body.issue_title,
    text: req.body.issue_text,
    created_by: req.body.created_by,
    assigned_to: req.body.assigned_to,
    status_text: req.body.status_text
  });

  newIssue.save()
    .then(issue => res.json(issue))
    .then(issue => {
      new Project({
        name: projectName,
        issue: issue._id
      }).save().catch(error => res.json({error: `${error}`}))
    })
    .catch(error => res.json({'error': 'Missing required fields'}));
});

module.exports = router;
