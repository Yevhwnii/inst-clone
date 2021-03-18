import React from 'react';
import Firebase from 'firebase';
import { Redirect, Route } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

interface ProtectedRouteProps {
  user: Firebase.User | null;
  children: React.ReactNode;
  [rest: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }
        if (!user) {
          return (
            <Redirect
              to={{ pathname: ROUTES.LOGIN, state: { from: location } }}
            />
          );
        }
        return null;
      }}
    />
  );
};

export default ProtectedRoute;
