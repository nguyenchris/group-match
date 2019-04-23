import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import WizardExample from '../../containers/test/test';

class ModalForm extends Component {
  state = {
    isOpen: true
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        toggle={this.toggleModal}
        modalClassName="modal-black"
        size="lg"
      >
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.toggleModalDemo}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
          <h5 className="modal-title">Modal title</h5>
        </div>
        <ModalBody>
          <WizardExample {...this.props} closeModal={this.toggleModal} />
        </ModalBody>
        {/* <ModalFooter> */}
        {/* <Button color="secondary" onClick={this.toggleModalDemo}>
            Close
          </Button>
          <Button color="primary">Save changes</Button> */}
        {/* </ModalFooter> */}
      </Modal>
    );
  }
}

export default ModalForm;
