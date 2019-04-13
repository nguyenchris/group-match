import React, { Component, Fragment } from 'react';
import IndexNavbar from '../Navbars/IndexNavbar.jsx';
import { connect } from '';

class Layout extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <IndexNavbar />
        <div className="wrapper">{this.props.children}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
