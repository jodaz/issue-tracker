import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, Form, FormGroup, Input } from 'reactstrap';
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
      assigned_to: ''
    }
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
    console.log(this.props.history);
    this.props.addIssue(project, issue);
    this.setState({modal: !modal});
  }

  render() {
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
              <FormGroup>
                <Input
                  type='text'
                  name='issue_title'
                  placeholder='Issue title (required)'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='issue_text'
                  placeholder='Issue description (required)'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='created_by'
                  placeholder='Issue author (required)'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='project'
                  placeholder='Project name'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='assigned_to'
                  placeholder='Assigned to'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='status_text'
                  placeholder='Status text'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
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

export default connect(null, { addIssue })(AddIssue);
