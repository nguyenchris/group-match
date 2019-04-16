import React, { Component, Fragment } from 'react';
import IndexNavbar from '../../components/Navbars/IndexNavbar.jsx';
import { connect } from 'react-redux';
import './Layout.css';

class Layout extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.toggle('index-page');
  }
  componentWillUnmount() {
    document.body.classList.toggle('index-page');
  }

  render() {
    return (
      <Fragment>
        <div className="index-navbar">
          <IndexNavbar {...this.props} />
          <div className="wrapper">
            <div className="main">{this.props.children}</div>
          </div>
        </div>
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
