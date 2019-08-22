const Issue   = require('../../models/Issue');

module.exports = (req, res) => {
  Issue.find({})
    .populate('project', ['project_name'])
    .sort({created_on: -1})
    .then(issues => res.json(issues))
    .catch(err => res.status(404).json({'noissues': 'no issues found'}));
};
