const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Issue = require('../../models/Issue');
const Project = require('../../models/Project');

//  @route   GET /api/project/:project_name
//  @desc    Return all issues for a project
router.get('/:project_name', (req, res) => {
  const projectName = req.params.project_name;
  const query = req.query;

  Project.find({name: projectName}).then(projects => {
      // No projects with name
      if (!projects.length) {
        return res
          .status(404)
          .json({error: 'project not found'});
      }

      Issue.find(query).then(issues => {
        // No issues found
        if (!issues.length) {
          return res
            .status(404)
            .json({issuesnotfound: 'no issues found'});
        }
        // else
        res.json(issues);
      });
    });
});

//  @route   POST /api/issues/:project_name
//  @desc    Creates new issue
router.post('/:project_name', (req, res) => {
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
    .catch(err => res.json({'error': 'Missing required fields'}));
});

//  @route   PUT /api/issues/:project_name
//  @desc    Updates issue
router.put('/:project_name', (req, res) => {

  if (!Object.keys(req.body).length) {
    return res
      .status(400)
      .json({'error': 'no updated field sent'});
  }

  let issueFields = {};

  if (req.body.title) issueFields.title = req.body.title;
  if (req.body.text) issueFields.text = req.body.text;
  if (req.body.created_by) issueFields.created_by = req.body.created_by;
  if (req.body.assigned_to) issueFields.assigned_to = req.body.assigned_to;
  if (req.body.status_text) issueFields.status_text = req.body.status_text;
  if (typeof(req.body.open) == typeof(Boolean())) issueFields.open = req.body.open;

  Issue.findOneAndUpdate(
    { _id: req.body._id },
    { $set: issueFields },
    { new: true })
  .then(newIssue => 
    res.json({'sucess': newIssue}))
  .catch(err => {
    res.status(400).json({'error': `could not update ${req.body._id}`});
  });
});

//  @route   DELETE api/issues/:project_name
//  @desc    Delete issue  
router.delete('/:project_name', (req, res) => {

  if (!req.body._id) {
    return res.status(400).json({error: '_id error'});
  }

  Issue.findOneAndDelete({_id: req.body._id}).then(() => {
    res.json({success: `deleted ${req.body._id}`});
  }).catch((err) => {
    res.status(404).json({failed: `could not delete ${req.body._id}`});
  });
});

module.exports = router;
