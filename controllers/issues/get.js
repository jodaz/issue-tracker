const Issue   = require('../../models/Issue');
const Project = require('../../models/Project');

module.exports = (req, res) => {
  const query   = req.query;
  const project = req.params.project;

  ( async () => {
    const project_id = 
      await Project
        .findOne({ project_name: project })
        .then(project => project._id);

    await Issue.find({ ...query, project: project_id })
      .populate('project', ['project_name'])
      .then(issues => res.json(issues))
      .catch(err => res.status(404).json({'noissues': 'no issues found'}));
  })();
};
