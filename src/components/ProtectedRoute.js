import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../services/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default ProtectedRoute;