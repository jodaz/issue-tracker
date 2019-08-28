import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteIssue } from '../../../../services/api/issues';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class IssueButtonActions extends Component {
  
  onDeleteClick = (project, id) => {
    this.props.deleteIssue(project, id);
  }

  render() {
    const issue = this.props.issue;

    return (
      <React.Fragment>
        <Button
          className='mr-1'
          color="success"
          size="sm"
        >
          Edit
        </Button>
        <Button
          className='mr-1'
          color="danger"
          size="sm"
          onClick={this.onDeleteClick.bind(this, issue.project.project_name, issue._id)}
        >
          Delete
        </Button>
      </React.Fragment>
    );
  }
};

IssueButtonActions.propTypes = {
  issue: PropTypes.object.isRequired,
  deleteIssue: PropTypes.func.isRequired
};

export default connect(null, { deleteIssue })(IssueButtonActions);
