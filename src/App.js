import React, { Component} from 'react';
import { withRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './Containers/Main.js'
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

  render() {
    return (
      <Router >
        <div className="App">
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route path="/" component={Main} />
            </Switch>
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
