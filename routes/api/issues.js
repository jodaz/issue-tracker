const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Issue = require('../../models/Issue');
const Project = require('../../models/Project');

// @route   GET  api/project/:project_name
// @desc    Return all issues for a project
router.get('/:project_name', (req, res) => {
  const projectName = req.params.project_name;
  const query = req.query;

  Project.find({name: projectName}).then(projectIssues => {
      Issue.find(query)
        .then(issue => res.json(issue))
    })
    .catch(err => console.log(`${err}`));
});

// @route   POST '/api/issues/:project_name'
// @desc    Creates new issue
router.post('/:project_name', (req, res) => {

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
