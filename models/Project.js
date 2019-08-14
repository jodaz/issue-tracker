const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  project_name: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model('projects', ProjectSchema);
