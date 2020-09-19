import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Akta from './pages/Akta';
import Dashboard from './pages/Dashboard'
import Profile from './pages/profile/Profile';

export class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
            <Route path="/" exact component={Dashboard} />
            <Route path="/akta" component={Akta} />
            <Route path="/profile" component={Profile} />
        </Fragment>
      </Router>
      
    )
  }
}

export default App
