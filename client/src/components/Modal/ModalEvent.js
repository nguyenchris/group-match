import React, { Component } from 'react';
import { Modal, ModalBody, Row, Col, Button, ModalFooter } from 'reactstrap';

class ModalEvent extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {}
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        modalClassName="modal-black"
        size="lg"
      >
        <div className="modal-header justify-content-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.props.toggle}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
          <h5 className="modal-title">{this.props.name}</h5>
        </div>
        <ModalBody>
          <div>
            <Row>
              <Col />
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModalDemo}>
            Close
          </Button>
          <Button color="primary">Save changes</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEvent;
