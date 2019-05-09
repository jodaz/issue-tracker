const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Issue model
const Issue = require('../../models/Issue');

//  @route   POST /api/issues/:project_name
//  @desc    Creates new issue
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

//  @route   PUT /api/issues/:project_name
//  @desc    Updates issue
router.put('/', (req, res) => {

  if (Object.keys(req.body).length == 0) {
    res.status(400).json({'error': 'no updated field sent'});
    return;
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
    console.log(`${err}`); 
    res.status(400).json({'error': `could not update ${req.body._id}`});
  });
});

//  @route   DELETE api/issues/:project_name
//  @desc    Delete issue  
router.delete('/', (req, res) => {

  if (!req.body._id) {
    res.status(400).json({error: '_id error'});
    return;
  }

  Issue.findOneAndDelete({_id: req.body._id}).then(() => {
    res.json({success: `deleted ${req.body._id}`});
  }).catch((err) => {
    res.status(404).json({failed: `could not delete ${req.body._id}`});
  });
});

module.exports = router;
