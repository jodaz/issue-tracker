import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroupInput from '../FormGroupInput';
import { Button, Modal, ModalBody, Form } from 'reactstrap';
import isEmpty from '../../../services/validation/isEmpty';
import { addIssue } from '../../../services/api/issues';
import { connect } from 'react-redux';

class AddIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      issue_title: '',
      issue_text: '',
      project: '',
      created_by: '',
      status_text: '',
      assigned_to: '',
      errors: ''
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
    this.setState({ modal: !this.state.modal });
  }

  handleSubmit = () => {
    const { modal, project, ...issue } = this.state;

    this.props.addIssue(project, issue);

    if (!isEmpty(this.props.errors)) {
      this.setState({modal: !modal});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          size='sm'
        >
          Add issue
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
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
              />
              <FormGroupInput
                type='text'
                name='issue_text'
                placeholder='Description'
                size='sm'
                error={errors.issue_text}
                onChange={this.handleChange}
              />
              <FormGroupInput
                type='text'
                name='created_by'
                placeholder='Author'
                size='sm'
                error={errors.created_by}
                onChange={this.handleChange}
              />
              <FormGroupInput
                type='text'
                name='project'
                placeholder='Project name'
                value='Default'
                size='sm'
                onChange={this.handleChange}
              />
              <FormGroupInput
                type='text'
                name='assigned_to'
                placeholder='Assigned to'
                size='sm'
                onChange={this.handleChange}
              />
              <FormGroupInput
                type='text'
                name='status_text'
                placeholder='Status text'
                size='sm'
                onChange={this.handleChange}
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
