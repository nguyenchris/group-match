import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ProfileForm from '../Form/Profile/ProfileForm';
import './ModalForm.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import NotificationAlertPopUp from '../NotificationAlert/NotificationAlertPopUp';
import { getCurrentWeather } from '../../utils/api';

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
    console.log(data);
    console.log(this.props.token);
    this.props.onCreateProfile(this.props.token, data);
  };

  render() {
    return (
      <Modal
        isOpen={!this.props.userState.isProfileCreated}
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

// const mapStateToProps = state => {
//   return {
//     userId: state.auth.userId,
//     token: state.auth.token,
//     userState: state.auth,
//     locationError: state.geo.error,
//     latitude: state.geo.latitude,
//     longitude: state.geo.longitude,
//     error: state.auth.error
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onCreateProfile: (token, data) => dispatch(actions.createProfile(token, data, 'create'))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ModalProfile);
