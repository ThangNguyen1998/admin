import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';

const Login = lazy(() => import('../../pages/Login'));
const SignUp = lazy(() => import('../../pages/SignUp'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/" component={AuthWrapper} />
      </Switch>
    </div>
  );
}
