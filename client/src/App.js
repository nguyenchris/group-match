import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Home from './containers/Home/Home';
import Search from './containers/Search/Search';
import IndexNavBar from './components/Navbars/IndexNavbar';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    let app = (
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/search" component={Search} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
    return <Layout>{app}</Layout>;
  }
}

export default App;
