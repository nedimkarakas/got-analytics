import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Stats from './Stats';
import Leaderboard from './Leaderboard';
import Navbar from './Navbar';
import NoMatch from "./NoMatch";
import Rules from '../components/Rules';
import Bracket from '../components/Bracket';

class Container extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div className="mt-4">
            <Switch>
              <Redirect exact from='/' to='/dashboard' />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              <ProtectedRoute exact path='/leaderboard' component={Leaderboard} />
              <ProtectedRoute exact path='/stats' component={Stats} />
              <ProtectedRoute exact path='/rules' component={Rules} />
              <ProtectedRoute exact path='/bracket' component={Bracket} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Container;
