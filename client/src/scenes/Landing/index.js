import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAll } from '../../services/api/issues';

class Landing extends Component {
  componentDidMount() {
    this.props.showAll();
  }

  render() {
    return (
      <div>
        { 
          this.props.issues.map((issue, index) => (
            <div key={index}>
              <p>{issue.issue_title}</p>
              <p>{issue.issue_text}</p>
              <p>{issue.created_by}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  issues: state.issues
});

export default connect(mapStateToProps, { showAll })(Landing);
