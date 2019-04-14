import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// eslint-disable-next-line
import * as actions from './store/actions/index';

import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Home from './containers/Home/Home';
import Search from './containers/Search/Search';
import Layout from './containers/Layouts/Layout';
import AdminLayout from './containers/Layouts/AdminLayout';
import './assets/scss/black-dashboard-react.scss';

class App extends Component {
  render() {
    console.log('render');
    let app;
    if (!this.props.isLoggedIn) {
      app = (
        <div>
          <Layout>
            <Switch>
              {/* <Route path="/user" render={props => <AdminLayout {...props} />} /> */}
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/search" component={Search} />
              {/* <Route path="/user" render={props => <AdminLayout {...props} />} /> */}
              <Route path="/" exact component={Home} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </div>
      );
    } else {
      app = (
        <div>
          <Switch>
            <Route path="/user" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/user" />
          </Switch>
        </div>
      );
    }

    return app;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
