import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Stats from './Stats';
import Leaderboard from './Leaderboard';
import Navbar from './Navbar';
import NoMatch from "./NoMatch";

class Container extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div className="mt-4">
          <Switch>
            <Redirect exact from='/' to='/dashboard' />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/leaderboard' component={Leaderboard} />
            <ProtectedRoute exact path='/stats' component={Stats} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Container;