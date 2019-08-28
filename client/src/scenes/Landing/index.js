import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAll, deleteIssue } from '../../services/api/issues';
import AddIssue from '../components/AddIssue';
import { Card, Button, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody } from 'reactstrap';

class Landing extends Component {
  componentDidMount() {
    this.props.showAll('/issues/all');
  }

  onDeleteClick = (project, id) => {
    this.props.deleteIssue(project, id);
  }

  render() {
    return (
      <div>
        <h2>Latest issues</h2>
        <AddIssue />
        <CardColumns>
          { 
            this.props.issues.map((issue, index) => (
              <Card key={index}>
                <CardBody>
                  <CardTitle>
                    <b>{issue.issue_title}</b>
                  </CardTitle>
                  <CardSubtitle>
                    Status: {' '}
                    {(issue.status_text) ? issue.status_text : 'Undefined'}
                    Project: {' '}
                    {issue.project.project_name}
                  </CardSubtitle>
                  <CardText>
                    Description: {' '}
                    { issue.issue_text }
                  </CardText>
                  <Button
                    color="success"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, issue.project.project_name, issue._id)}
                  >
                    Delete
                  </Button>
                </CardBody>
              </Card>
            ))
          }
        </CardColumns>
        <h2>All projects</h2>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  issues: state.issue.issues
});

export default connect(mapStateToProps, { showAll, deleteIssue })(Landing);
