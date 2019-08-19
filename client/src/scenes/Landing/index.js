import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAll, deleteIssue } from '../../services/api/issues';

import { Card, Button, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody, CardHeader, CardFooter } from 'reactstrap';

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
        <CardColumns>
          { 
            this.props.issues.map((issue, index) => (
              <Card key={index}>
                <CardHeader>
                  <b>{issue.issue_title}</b>
                </CardHeader>
                <CardBody>
                  <CardTitle>
                    Project: {' '}
                    {issue.project.project_name}
                  </CardTitle>
                  <CardSubtitle>
                    Status: {' '}
                    {(issue.status_text) ? issue.status_text : 'Undefined'}
                  </CardSubtitle>
                  <CardText>
                    Description: {' '}
                    { issue.issue_text }
                  </CardText>
                </CardBody>
                <CardFooter>
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
                </CardFooter>
              </Card>
            ))
          }
        </CardColumns>
        <h2>All projects</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  issues: state.issue.issues
});

export default connect(mapStateToProps, { showAll, deleteIssue })(Landing);
