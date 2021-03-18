import React from 'react';
import Firebase from 'firebase';
import { Redirect, Route } from 'react-router-dom';

interface IsUserLoggedInProps {
  user: Firebase.User | null;
  loggedInPath: string;
  children: React.ReactNode;
  [rest: string]: any;
}

const IsUserLoggedIn: React.FC<IsUserLoggedInProps> = ({
  user,
  children,
  loggedInPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }
        if (user) {
          return (
            <Redirect
              to={{ pathname: loggedInPath, state: { from: location } }}
            />
          );
        }
        return null;
      }}
    />
  );
};

export default IsUserLoggedIn;
