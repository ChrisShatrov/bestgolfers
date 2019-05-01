import React, {Component} from 'react';
import './AddNewGolferModal.css';
import GolferTile from './../../tiles/GolferTile';
import {
  Modal,
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

class AddNewGolferModal extends Component {
  constructor (props, context) {
    super (props, context);

    this.handleFormSubmit = this.handleFormSubmit.bind (this);
    this.handleFormChange = this.handleFormChange.bind (this);
    this.state = {
      newGolfer: {
        firstName: '',
        lastName: '',
        username: '',
        catchPhrase: '',
        avatar: '',
      },
      showGeneralError: false,
      firstNameMissing: false,
      lastNameMissing: false,
      usernameMissing: false,
      catchPhraseMissing: false,
    };
  }

  handleFormSubmit (e) {
    e.preventDefault ();
    let golferData = this.state.newGolfer;
    const that = this;

    // Making sure first name is entered
    if (!golferData.firstName) {
      that.setState ({
        showGeneralError: true,
        firstNameMissing: true,
      });
    } else {
      that.setState ({
        showGeneralError: false,
        firstNameMissing: false,
      });
    }

    // Making sure last name is entered
    if (!golferData.lastName) {
      that.setState ({
        showGeneralError: true,
        lastNameMissing: true,
      });
    } else {
      that.setState ({
        showGeneralError: false,
        lastNameMissing: false,
      });
    }

    // Making sure user name is entered
    if (!golferData.username) {
      that.setState ({
        showGeneralError: true,
        usernameMissing: true,
      });
    } else {
      that.setState ({
        showGeneralError: false,
        usernameMissing: false,
      });
    }

    // Making sure catch phrase is entered
    if (!golferData.catchPhrase) {
      that.setState ({
        showGeneralError: true,
        catchPhraseMissing: true,
      });
    } else {
      that.setState ({
        showGeneralError: false,
        catchPhraseMissing: false,
      });
    }

    if (
      golferData.firstName &&
      golferData.lastName &&
      golferData.username &&
      golferData.catchPhrase
    ) {
      fetch ('http://localhost:3004/people/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify (golferData),
      }).then (function (response) {
        if (response.status === 404) {
          console.log ('error!!! 404');
          that.props.updateFailMessage (true);
          that.props.onHide ();
          that.props.getData (false);
        } else {
          that.props.updateFailMessage (false);
          // Clearing out the form
          that.setState ({
            newGolfer: {
              firstName: '',
              lastName: '',
              username: '',
              catchPhrase: '',
              avatar: '',
            },
          });
          that.props.onHide ();
          that.props.getData (true);
        }
      });
    }
  }

  handleFormChange (e) {
    let value = e.target.value;
    let id = e.target.id;
    this.setState (prevState => ({
      newGolfer: {
        ...prevState.newGolfer,
        [id]: value,
      },
    }));
  }

  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton onClick={this.props.onHide}>
          <Modal.Title className="add-golfer-modal-header">
            Add Golfer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="add-new-golfer-modal-form"
            onSubmit={e => this.handleFormSubmit}
            horizontal
          >
            <div
              className={
                this.state.showGeneralError ? 'general-form-error' : 'hideThis'
              }
            >
              Some of the required fields are missing.
            </div>
            <FormGroup controlId="firstName">
              <Col className="form-label" componentClass={ControlLabel} sm={12}>
                First Name
              </Col>
              <Col sm={12}>
                <FormControl
                  className={this.state.firstNameMissing ? 'field-error' : ''}
                  onChange={this.handleFormChange}
                  value={this.state.newGolfer.firstName}
                  type="text"
                  placeholder="First Name"
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="lastName">
              <Col className="form-label" componentClass={ControlLabel} sm={12}>
                Last Name
              </Col>
              <Col sm={12}>
                <FormControl
                  className={this.state.lastNameMissing ? 'field-error' : ''}
                  onChange={this.handleFormChange}
                  value={this.state.newGolfer.lastName}
                  type="text"
                  placeholder="Last Name"
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="username">
              <Col className="form-label" componentClass={ControlLabel} sm={12}>
                Username
              </Col>
              <Col sm={12}>
                <FormControl
                  className={this.state.usernameMissing ? 'field-error' : ''}
                  onChange={this.handleFormChange}
                  value={this.state.newGolfer.username}
                  type="text"
                  placeholder="Username"
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="catchPhrase">
              <Col className="form-label" componentClass={ControlLabel} sm={12}>
                Catch Phrase
              </Col>
              <Col sm={12}>
                <FormControl
                  className={this.state.catchPhraseMissing ? 'field-error' : ''}
                  onChange={this.handleFormChange}
                  value={this.state.newGolfer.catchPhrase}
                  type="text"
                  placeholder="Catch Phrase"
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="avatar">
              <Col className="form-label" componentClass={ControlLabel} sm={12}>
                Avatar URL
              </Col>
              <Col sm={12}>
                <FormControl
                  onChange={this.handleFormChange}
                  value={this.state.newGolfer.avatar}
                  type="text"
                  placeholder="Avatar URL"
                />
              </Col>
            </FormGroup>
            <Button
              onClick={this.handleFormSubmit}
              className="add-new-golfer-modal-add-button"
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddNewGolferModal;
