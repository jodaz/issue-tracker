import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  Form, FormGroup, Input } from 'reactstrap';

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
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  handleSubmit = () => {
    const issue = {
      issue_title: this.state.title,
      issue_text: this.state.description,
      created_by: this.state.author,
      status_text: this.state.status,
      assigned_to: this.state.assigned_to
    }

    console.log(issue);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          size='sm'
        >
          Add issue
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={false}>
          <ModalHeader toggle={this.toggle}>New issue</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                  type='text'
                  name='title'
                  placeholder='Issue title (required)'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='description'
                  placeholder='Issue description (required)'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='author'
                  placeholder='Issue author (required)'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='text'
                  name='project_name'
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
                  name='status'
                  placeholder='Status text'
                  bsSize='sm'
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit} size='sm'>Add</Button>
            {' '}
            <Button color="danger" onClick={this.toggle} size='sm'>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddIssue;
