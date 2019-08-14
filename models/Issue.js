const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const IssueSchema = new Schema({
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
    type: String,
  },
  status_text: {
    type: String
  },
  open: {
    type: Boolean,
    default: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: Date.now
  }
});

module.exports = Issue = mongoose.model('Issue', IssueSchema);
