import React, { Component, Fragment } from 'react';
import { withRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './Containers/Main.js'
import LoginRegisterPage from './Containers/LoginRegisterPage.js'
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

  routerLogic = () => {
    if (localStorage.getItem('jwt')) {
      return <Route path="/" component={Main} />
    } else {
      return <Route path="/" component={LoginRegisterPage} />
    }
  }

  render() {
    return (
      <Router >
        <div className="App">
          {this.routerLogic()}
        </div>
      </Router>
    )
  }
}


export default withRouter(App);


// <Fragment>
//   <NavBar />
//   <Switch>
//     <Route exact path="/" render={() => <Redirect to="/profile" />} />
//     <Route exact path="/profile" component={Profile} />
//     <Route exact path="/login" component={LoginForm} />
//     <Route component={NotFound} />
//   </Switch>
// </Fragment>
