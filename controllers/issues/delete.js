const Issue = require('../../models/Issue');

module.exports = (req, res) => {
  Issue.findOneAndDelete({ _id: req.body.id }).then(issue => {
    res.json({ success: `${issue._id}` });
  })
  .catch(err => 
    res.status(404).json({ notfound: `Could not delete ${issue._id}`}));
};
