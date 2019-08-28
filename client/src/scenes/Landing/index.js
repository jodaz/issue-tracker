import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAll, deleteIssue } from '../../services/api/issues';
import AddIssue from '../components/AddIssue';
import IssueButtonActions from './components/IssueButtonActions';
import { Card, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody } from 'reactstrap';

class Landing extends Component {
  componentDidMount() {
    this.props.showAll('/issues/all');
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
                  <IssueButtonActions issue={issue} />
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
