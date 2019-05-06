import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

// Component that logs out user and redirects back to homepage
class Logout extends Component {
  // When component mounts call onLogout method, which emits the logout action
  // to make state false for isLoggedIn
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    window.location.reload();
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
