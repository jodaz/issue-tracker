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
  }
  // creation: [
  //   {
  //     created_by: {
  //       type: String,
  //       required: true
  //     },
  //     assig_to: {
  //       type: String
  //     },
  //     created_on: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ],
  // status: [
  //   {
  //     text: {
  //       type: String
  //     },
  //     open: {    
  //       type: Boolean,
  //       default: true
  //     },
  //     update: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ]
});

module.exports = Issue = mongoose.model('issue', IssueSchema);
