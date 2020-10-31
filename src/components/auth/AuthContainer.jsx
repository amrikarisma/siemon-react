import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";
import Akta from '../../pages/akta/Akta';
import Login from '../../pages/auth/Login';
import Dashboard from '../../pages/dashboard/Dashboard';
import { Laporan } from '../../pages/laporan/Laporan';
import Notaris from '../../pages/notaris/Notaris';
import Protokol from '../../pages/pemeriksaan/Protokol';
import Profile from '../../pages/profile/Profile';

export class AuthContainer extends Component {

  render() {
    const loggedIn = sessionStorage.getItem('loggedIn')
    
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        loggedIn === 'true'
          ? <Component {...props} />
          : props.history.push("/login")
      )} />
    )

    return (
      <Router>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/akta" component={Akta} />
          <PrivateRoute path="/notaris" component={Notaris} />
          <PrivateRoute path="/laporan" component={Laporan} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/protokol" component={Protokol} />
          <Route path="/login" component={Login} />
          {sessionStorage.getItem('_token') ? <Redirect to="/dashboard" /> : <Redirect to="/login" /> }
        </Switch>
      </Router>
    )
  }

}

export default AuthContainer
