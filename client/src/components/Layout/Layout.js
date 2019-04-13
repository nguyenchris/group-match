import React, { Component, Fragment } from 'react';
import IndexNavbar from '../Navbars/IndexNavbar.jsx';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Footer from '../Footer/Footer';
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
        <IndexNavbar />
        <div className="wrapper">
          {/* <div className="page-header header-filter">
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <Container>
              <div className="content-center brand">
                <h1 className="h1-seo">BLK• React</h1>
                <h3 className="d-none d-sm-block">
                  A beautiful Design System for Bootstrap 4 (reactstrap) and React. It's Free and
                  Open Source.
                </h3>
              </div>
            </Container>
          </div> */}
          <div className="main">{this.props.children}</div>
          {/* <Footer /> */}
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
