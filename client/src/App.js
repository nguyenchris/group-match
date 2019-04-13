import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Home from './containers/Home/Home';
import Search from './containers/Search/Search';
import IndexNavBar from './components/Navbars/IndexNavbar';

class App extends Component {
  render() {
    return (
      <div>
        <IndexNavBar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/search" component={Search} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
