import React, {Component} from 'react';
import './DeleteConfirmationModal.css';
import {
  Modal,
  Button,
  OverlayTrigger,
  Popover,
  Tooltip,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

class DeleteConfirmationModal extends Component {
  constructor (props, context) {
    super (props, context);

    this.handleDelete = this.handleDelete.bind (this);
  }

  handleDelete (e) {
    e.preventDefault ();
    let userId = this.props.idToBeDeleted;
    const that = this;

    fetch ('http://localhost:3004/people/' + userId, {
      method: 'delete',
    }).then (function (response) {
      if (response.status === 404) {
        console.log ('error!!! 404');
        that.props.updateFailMessage (true);
        that.props.onHideDelete ();
        that.props.getData (false);
      } else {
        that.props.onHideDelete ();
        that.props.getData (true);
      }
    });
  }

  render () {
    return (
      <Modal show={this.props.showDelete} onHide={this.props.onHideDelete}>
        <Modal.Header closeButton onClick={this.props.onHideDelete}>
          <Modal.Title className="add-golfer-modal-header">
            Are you sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="are-you-sure">
            Are you sure you want to delete <b>{this.props.nameToBeDeleted}</b>?
          </div>
          <Button onClick={this.handleDelete} className="delete-button">
            Yes
          </Button>
          <Button onClick={this.props.onHideDelete} className="delete-button">
            No
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default DeleteConfirmationModal;
