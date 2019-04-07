import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Stats from './Stats';
import Leaderboard from './Leaderboard';
import Navbar from './Navbar';
import NoMatch from "./NoMatch";
import Rules from '../components/Rules';

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
            <ProtectedRoute exact path='/rules' component={Rules} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Container;
