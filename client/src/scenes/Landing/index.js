import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAll } from '../../services/api/issues';

import { Card, Button, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody, CardHeader, CardFooter } from 'reactstrap';

class Landing extends Component {
  componentDidMount() {
    this.props.showAll('/issues/all');
  }

  render() {
    return (
      <div>
        <h2>Latest issues</h2>
        <CardColumns>
          { 
            this.props.issues.map((issue, index) => (              
              <Card key={index}>
                <CardHeader>{issue.issue_title}</CardHeader>
                <CardBody>
                  <CardTitle>
                    Project: {issue.project.project_name}
                  </CardTitle>
                  <CardSubtitle>
                    Status: {(issue.status_text) ? issue.status_text : 'Undefined'}
                  </CardSubtitle>
                  <CardText>
                    { issue.issue_text }
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Button>Test Button</Button>
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

export default connect(mapStateToProps, { showAll })(Landing);
