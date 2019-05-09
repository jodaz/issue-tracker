const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  issue: {
    type: Schema.Types.ObjectId,
    ref: 'issues'
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = Project = mongoose.model('project', ProjectSchema)
