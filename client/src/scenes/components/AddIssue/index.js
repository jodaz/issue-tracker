import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroupInput from '../FormGroupInput';
import { Button, Modal, ModalBody, Form } from 'reactstrap';
import { addIssue } from '../../../services/api/issues';
import { connect } from 'react-redux';

const setIssue = {
  issue_title: '',
  issue_text: '',
  project: '',
  created_by: '',
  status_text: '',
  assigned_to: ''
}

class AddIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ...setIssue,
      errors: {}
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }

  toggle = () => this.setState({ modal: !this.state.modal, ...setIssue });

  handleSubmit = () => {
    const { modal, project, errors, ...issue } = this.state;

    this.props.addIssue(project, issue);
    this.toggle();
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors.errors) {
      const oldIssue = newProps.errors.issue;

      this.setState({
        errors: newProps.errors.errors,
        modal: true,
        ...oldIssue
      });
    }
  };

  render() {
    const { errors, modal, ...issue } = this.state;

    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          size='sm'
        >
          Add issue
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalBody>
            <h4>New Issue</h4>
            <Form>
              <FormGroupInput
                type='text'
                name='issue_title'
                placeholder='Title'
                size='sm'
                error={errors.issue_title}
                onChange={this.handleChange}
                value={issue.issue_title}
              />
              <FormGroupInput
                type='text'
                name='issue_text'
                placeholder='Description'
                size='sm'
                error={errors.issue_text}
                onChange={this.handleChange}
                value={issue.issue_text}
              />
              <FormGroupInput
                type='text'
                name='created_by'
                placeholder='Author'
                size='sm'
                error={errors.created_by}
                onChange={this.handleChange}
                value={issue.created_by}
              />
              <FormGroupInput
                type='text'
                name='project'
                placeholder='Project name'
                size='sm'
                onChange={this.handleChange}
                value={issue.project}
              />
              <FormGroupInput
                type='text'
                name='assigned_to'
                placeholder='Assigned to'
                size='sm'
                onChange={this.handleChange}
                value={issue.assigned_to}
              />
              <FormGroupInput
                type='text'
                name='status_text'
                placeholder='Status text'
                size='sm'
                onChange={this.handleChange}
                value={issue.status_text}
              />
            </Form>
            <Button color="primary" onClick={this.handleSubmit} size='sm'>Add</Button>
            {' '}
            <Button color="danger" onClick={this.toggle} size='sm'>Cancel</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AddIssue.propTypes = {
  addIssue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addIssue })(AddIssue);
