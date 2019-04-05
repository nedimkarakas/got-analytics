import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../services/auth';

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     auth.isAuthenticated() === true
//       ? <Component {...props} />
//       : this.props.location !== '/login' ? <Redirect to='/login' /> : null
//   )} />
// )

class ProtectedRoute extends Component{
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest} render={(props) => (
        auth.isAuthenticated() === true
          ? <Component {...props} />
          : this.props.location !== '/login' ? <Redirect to='/login' /> : null
      )} />
    );
  }
}

export default ProtectedRoute;