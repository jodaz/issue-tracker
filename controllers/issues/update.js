const validateBody  = require('../../validation/body');
const Issue         = require('../../models/Issue');

module.exports = (req, res) => {
  const { errors, isValid } = validateBody(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { id, ...newData } = req.body;

  Issue.findOneAndUpdate(
    { _id: id },
    { $set: newData, $currentDate: { updated_on: true } },
    { new: true }
  ).then( issue => res.json({ success: true, issue }))
  .catch( err => res.status(404).json({ notfound: `Could not update ${id}` }));
};
