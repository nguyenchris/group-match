import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import CreateEventForm from '../Form/CreateEventForm';
import './ModalForm.css';

class ModalForm extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {}

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        modalClassName="modal-black"
        size="lg"
      >
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.props.toggle}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
          {/* <h5 className="modal-title">Create Meetup</h5> */}
        </div>
        <div className="modal-event-form">
          <ModalBody>
            <CreateEventForm
              {...this.props}
              closeModal={this.toggleModal}
              finishButtonClick={this.props.finishButtonClick}
            />
          </ModalBody>
          {/* <ModalFooter> */}
          {/* <Button color="secondary" onClick={this.toggleModalDemo}>
            Close
          </Button>
          <Button color="primary">Save changes</Button> */}
          {/* </ModalFooter> */}
        </div>
      </Modal>
    );
  }
}

export default ModalForm;
