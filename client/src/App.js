import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Home from './containers/Home/Home';
import Layout from './containers/Layouts/Index/Layout';
import AdminLayout from './containers/Layouts/Admin/AdminLayout';
// import Logout from './containers/Auth/Logout';
// import './assets/css/blk-design-system-react.css';
import './assets/scss/black-dashboard-pro-react.scss';

// import './assets/css/black-dashboard-pro-react.css';

class App extends Component {
  componentDidMount() {
    // When app mounts, dispatch auto login if token expiration is available
    this.props.onTryAutoLogin();
  }
  render() {
    let app;

    app = (
      <div>
        <Layout>
          {/* <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/search" component={Search} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch> */}
          <Switch>
            <Route path="/login" exact render={props => <Login {...props} />} />
            <Route path="/signup" exact render={props => <Signup {...props} />} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
    if (this.props.isLoggedIn) {
      app = (
        <div>
          <Switch>
            <Route path="/user" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/user/test" />
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
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
