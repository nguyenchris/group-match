import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import IndexNavBar from './components/Navbars/IndexNavbar'

class App extends Component {
  render() {
    return (
      <div>
      <IndexNavBar/>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/search" component={Search} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
