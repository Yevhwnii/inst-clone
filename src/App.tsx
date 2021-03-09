import { AnimatePresence } from 'framer-motion';
import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));

const App: React.FC = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={ROUTES.LOGIN}>
            <Login />
          </Route>
          <Route path={ROUTES.SIGN_UP}>
            <SignUp />
          </Route>
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
};

export default App;
