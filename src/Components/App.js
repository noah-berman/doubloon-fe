import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './Home.js'
import NavBar from './NavBar.js'


import '../Assets/css/App.css';

// App
//   NavBar
//   Login - ROUTE: /login
//   Register - ROUTE: /register
//   Home - ROUTE: /:id/home
//     TransactionForm
//     MyTrackingContainer
//       MyHeadline
//       MyChartsContainer
//         ChartComponent
//   MyCharts - /:id/charts
//     ChartSelector
//   MyProfile - /:id/profile

class App extends Component {
  render() {
    return (
      <Home />
    )
  }
}

export default App;

// <Fragment>
//   <NavBar />
//   <Switch>
//     <Route exact path="/" render={() => <Redirect to="/profile" />} />
//     <Route exact path="/profile" component={Profile} />
//     <Route exact path="/login" component={LoginForm} />
//     <Route component={NotFound} />
//   </Switch>
// </Fragment>
