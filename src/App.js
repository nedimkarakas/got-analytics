import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import './App.css';

import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import Leaderboard from './components/Leaderboard';
import NoMatch from "./components/NoMatch";
import Rules from './components/Rules';
import Bracket from './components/Bracket';

class App extends Component {
  render() {
    return (
        <Router>
          <Route component={Navbar} />
          <Switch>
            <Route path='/login' component={Login} />
              <div className="container">

            <div className="mt-4">
                <ProtectedRoute exact path='/' component={Dashboard} />
                <ProtectedRoute exact path='/leaderboard' component={Leaderboard} />
                <ProtectedRoute exact path='/stats' component={Stats} />
                <ProtectedRoute exact path='/rules' component={Rules} />
                <ProtectedRoute exact path='/bracket' component={Bracket} />
                </div>
            </div>
            <Route component={NoMatch} />
          </Switch>
        </Router>
    );
  }
}

export default App;
