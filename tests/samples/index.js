const 
  completeIssue = {
    issue_title: 'Title',
    issue_text: 'text',
    created_by: 'Functional Test - Every field filled in',
    assigned_to: 'Chai and Mocha',
    status_text: 'In QA'
  },
  requiredFields = {
    issue_title: 'Issue 2',
    issue_text: 'text',
    created_by: 'Functional Test - Required fields filled in'
  },
  missingFields = {
    assigned_to: 'Chai and Mocha',
    status_text: 'In QA'
  };

module.exports = {
  completeIssue,
  requiredFields,
  missingFields
};
