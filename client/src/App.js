import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/search" component={Search} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
