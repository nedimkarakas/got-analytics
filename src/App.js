import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Container from './components/Container';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/' component={Container} />
          </Switch>
        </Router>
    );
  }
}

export default App;
