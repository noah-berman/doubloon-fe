import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginRegisterNavBar from '../Components/LoginRegisterNavBar.js';
import RegisterForm from './RegisterForm.js'
import LoginForm from './LoginForm.js'



class LoginRegisterPage extends Component {

  render() {
    return (
      <Router >
        <div className="App">
          <LoginRegisterNavBar />
            <Switch>
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login" component={LoginForm} />
            </Switch>
          </div>
      </Router>
    )
  }
}


export default withRouter(LoginRegisterPage);
