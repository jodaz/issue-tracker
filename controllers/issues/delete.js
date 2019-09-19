const Issue = require('../../models/Issue');
const validateBody = require('../../validation/body');

module.exports = (req, res) => {

  const { errors, isValid } = validateBody(req.body);

  if ((!isValid) && errors.iderr) {
    return res.status(400).json(errors);
  }

  Issue.findOneAndDelete({ _id: req.body.id }).then(issue => {
    res.json({ success: `${issue._id}` });
  }).catch(err => 
    res.status(400).json({ notfound: `Could not delete ${req.body.id}`}));
};
