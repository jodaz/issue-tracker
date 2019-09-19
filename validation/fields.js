const isEmpty = require('./isEmpty');

const validateFields = data => {
  const errors = {};

  if (isEmpty(data.issue_title)) {
    errors.issue_title = 'Missing issue title';
  }
  if (isEmpty(data.issue_text)) {
    errors.issue_text = 'Missing issue description';
  }
  if (isEmpty(data.created_by)) {
    errors.created_by = 'Missing issue author';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
};

module.exports = validateFields;
