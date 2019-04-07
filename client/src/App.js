import React, { Component } from 'react';
import Signup from './pages/Auth/Signup';
import { Switch, Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;
