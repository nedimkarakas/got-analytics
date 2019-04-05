import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import Main from './components/Main.js';
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path ='/login' component={Login} />
            <ProtectedRoute path ='/main' component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
