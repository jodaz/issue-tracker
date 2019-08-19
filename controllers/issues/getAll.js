const Issue   = require('../../models/Issue');

module.exports = (req, res) => {
  const query   = req.query;

  Issue.find({})
    .populate('project', ['project_name'])
    .then(issues => res.json(issues))
    .catch(err => res.status(404).json({'noissues': 'no issues found'}));
};