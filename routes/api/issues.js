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

// @Router  DELETE api/issues/:project_name
// @desc    Delete issue  
router.delete('/', (req, res) => {

  if (!req.body._id) {
    res.status(400).json({error: '_id error'})
  }

  // Issues.findOneAndRemove({_id: req.body._id}).then(() => {
  //   res.json({sucess: `deleted ${req.body._id}`});
  // }).catch((err) => {
  //   console.log(`${err}`);
  //   res.status(404).json({failed: `could not delete ${req.body._id}`});
  // })
})

module.exports = router;
