const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Issue model
const Issue = require('../../models/Issue');

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

router.put('/', (req, res) => {
  let issueFields = {
    id: req.body._id
  }

  if (Array(req.body).length == 1) {
    res.json({'error': 'no updated field sent'});
    res.send();
  }

  if (req.body.title) issueFields.title = req.body.title;
  if (req.body.text) issueFields.text = req.body.text;
  if (req.body.created_by) issueFields.created_by = req.body.created_by;
  if (req.body.assigned_to) issueFields.assigned_to = req.body.assigned_to;
  if (req.body.status_text) issueFields.status_text = req.body.status_text;
  if (typeof(req.body.open) == typeof(Boolean())) issueFields.open = req.body.open;

  Issue.findOne({_id: issueFields.id}).then(issue => {
    
    if (issue) {

      // res.json({'error': 'no updated field sent'});
      // res.json({})
    } else {
      res.json({'error': `could not update ${issueFields._id}`});
    }
  }).catch(err => {
    console.log(`${err}`);
  });

  // console.log(issueFields);
  // res.json({});
});

module.exports = router;
