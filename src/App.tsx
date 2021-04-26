import { AnimatePresence } from 'framer-motion';
import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import Spinner from './components/Spinner';
import * as ROUTES from './constants/routes';
import AuthContext from './context/auth';
import UserContext from './context/user';
import IsUserLoggedIn from './helpers/isUserLoggedIn';
import ProtectedRoute from './helpers/protected.route';
import useAuth from './hooks/useAuth';
import useUser from './hooks/useUser';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  const location = useLocation();
  const [authUser] = useAuth();
  const { user: loggedInUser } = useUser(authUser?.uid || '');

  return (
    <AuthContext.Provider
      value={{
        authUser,
      }}>
      <UserContext.Provider value={{ user: loggedInUser }}>
        <Suspense
          fallback={
            <Spinner spinnerStyles={{ height: '100vh', width: '100vw' }} />
          }>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <IsUserLoggedIn
                user={authUser}
                loggedInPath={ROUTES.DASHBOARD}
                exact
                path={ROUTES.LOGIN}>
                <Login />
              </IsUserLoggedIn>
              <IsUserLoggedIn
                user={authUser}
                loggedInPath={ROUTES.DASHBOARD}
                exact
                path={ROUTES.SIGN_UP}>
                <SignUp />
              </IsUserLoggedIn>
              <Route path={ROUTES.PROFILE}>
                <Profile />
              </Route>
              <ProtectedRoute
                user={authUser}
                exact={true}
                path={ROUTES.DASHBOARD}>
                <Dashboard />
              </ProtectedRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
