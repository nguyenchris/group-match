import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ProfileForm from '../Form/Profile/ProfileForm';
import './ModalForm.css';

class ModalProfile extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    if (!this.props.userState.isProfileCreated) {
      this.toggleModal();
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  finishButtonClick = e => {
    console.log(e);
    this.toggleModal();
  };

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        modalClassName="modal-black"
        size="lg"
        unmountOnClose={true}
      >
        <div className="modal-event-form">
          <ModalBody>
            <ProfileForm {...this.props} finishButtonClick={this.finishButtonClick} />
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

export default ModalProfile;
