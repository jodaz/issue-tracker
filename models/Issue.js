const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IssueSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String
  },
  status_text: {
    type: String
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: Date.now
  },
  open: {
    type: Boolean,
    default: true
  }
});

module.exports = Issue = mongoose.model('issue', IssueSchema);
