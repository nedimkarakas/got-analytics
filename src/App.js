import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Container from './components/Container';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/' component={Container} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;