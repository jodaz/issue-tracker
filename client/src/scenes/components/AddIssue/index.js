import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroupInput from '../FormGroupInput';
import isEmpty from '../../../services/validation/isEmpty';
import { Button, Modal, ModalBody, Form } from 'reactstrap';
import { addIssue } from '../../../services/api/issues';
import { setModal } from '../../../services/api/modal';
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

  toggle = () => {
    this.props.setModal();
    this.setState({ ...setIssue });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { project, errors, ...issue } = this.state;

    this.props.addIssue(project, issue);
    this.toggle();
  };

  componentWillReceiveProps(newProps) {
    const errProps = newProps.errors;

    if (!isEmpty(errProps.errors)) {
      const oldIssue = errProps.issue;

      this.setState({
        errors: errProps.errors,
        ...oldIssue
      });
    }
  };

  render() {
    const { errors, ...issue } = this.state;
    const modal = this.props.modal;

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
};

AddIssue.propTypes = {
  addIssue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  modal: state.modal
});

export default connect(mapStateToProps, { addIssue, setModal })(AddIssue);
