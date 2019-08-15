const Issue         = require('../../models/Issue');
const Project       = require('../../models/Project');
const validateIssue = require('../../validation/fields');

module.exports = (req, res) => {
  const { errors, isValid } = validateIssue(req.body);

  if (!isValid) return res.status(400).json(errors);

  const issueData = {
    issue_title: req.body.issue_title,
    issue_text: req.body.issue_text,
    created_by: req.body.created_by,
  };

  if (req.body.status_text) issueData.status_text = req.body.status_text;
  if (req.body.assigned_to) issueData.assigned_to = req.body.assigned_to;

  Project.findOne({ project_name : req.params.project}).then(project => {
    if (project) return project._id;
    else {
      new Project({ project_name : req.params.project })
        .save()
        .then(project => project._id)
        .catch(err => console.log(err));
    }
  }).then(id => {
    // Save reference
    issueData.project = id;

    new Issue(issueData)
      .save()
      .then(issue => res.status(200).json(issue))
      .catch(err => console.log(err));
  }).catch(err => console.log(err));
};
