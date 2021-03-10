import { AnimatePresence } from 'framer-motion';
import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import Spinner from './components/Spinner';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuth from './hooks/useAuth';
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  const location = useLocation();
  const [authUser, userDoc] = useAuth();
  return (
    <UserContext.Provider
      value={{
        authUser,
        userDoc,
      }}>
      <Suspense
        fallback={
          <Spinner spinnerStyles={{ height: '100vh', width: '100vw' }} />
        }>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path={ROUTES.LOGIN}>
              <Login />
            </Route>
            <Route exact path={ROUTES.SIGN_UP}>
              <SignUp />
            </Route>
            <Route exact path={ROUTES.DASHBOARD}>
              <Dashboard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </AnimatePresence>
      </Suspense>
    </UserContext.Provider>
  );
};

export default App;
