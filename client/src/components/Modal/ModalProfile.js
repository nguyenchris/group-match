import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ProfileForm from '../Form/Profile/ProfileForm';
import './ModalForm.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
// import NotificationAlertPopUp from '../NotificationAlert/NotificationAlertPopUp';

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
    const data = {
      aboutMe: e.About.aboutMe,
      imageUrl: e.Image.url
    };
    this.props.onCreateProfile(this.props.token, data);
  };

  render() {
    return (
      <Modal
        isOpen={!this.props.userState.isProfileCreated}
        modalClassName="modal-black"
        size="lg"
        unmountOnClose={true}
        focus={true}
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

const mapDispatchToProps = dispatch => {
  return {
    onCreateProfile: (token, data) => dispatch(actions.createProfile(token, data, 'create'))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ModalProfile);
