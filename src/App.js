import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Containers/Home.js';
import NavBar from './Components/NavBar.js';
import ChartPage from './Containers/ChartPage.js';
import BudgetPage from './Containers/BudgetPage.js';
import LoginForm from './Containers/LoginForm.js'


import './Assets/css/App.css';

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

  componentDidMount() {
  }

  state = {
    currentPage: 'home'
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/charts" component={ChartPage} />
          <Route exact path="/budget" component={BudgetPage} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    budget: state.budget.budget
  }
}

export default withRouter(connect(mapStateToProps)(App));

// <Fragment>
//   <NavBar />
//   <Switch>
//     <Route exact path="/" render={() => <Redirect to="/profile" />} />
//     <Route exact path="/profile" component={Profile} />
//     <Route exact path="/login" component={LoginForm} />
//     <Route component={NotFound} />
//   </Switch>
// </Fragment>
