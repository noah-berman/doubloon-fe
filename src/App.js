import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { selectInitialUserBudgetAction, fetchTotalTransactionsAction, fetchUserBudgetAction} from './Actions'
import Home from './Containers/Home.js';
import NavBar from './Components/NavBar.js';
import BudgetPage from './Containers/BudgetPage.js';
import LoginForm from './Containers/LoginForm.js'
import withAuth from './hocs/withAuth.js'
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
    this.props.setInitialBudget(this.props.user.id);
    this.props.fetchUserBudget(this.props.user.id);
    this.props.fetchTotalTransactions(this.props.user.id);

  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      console.log(this.props)
      this.props.setInitialBudget(this.props.user.id)
      this.props.fetchUserBudget(this.props.user.id)
      this.props.fetchTotalTransactions(this.props.user.id)
    }
  }

  render() {
    return (
      <Router >
        <div className="App">
          <NavBar />
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/budget" component={BudgetPage} />
              <Route exact path="/logout" />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
      </Router>
    )
  }
}

function mapStateToProps(state){
  return {
    budget: state.budget.budget,
    user: state.user.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setInitialBudget: (userId) => dispatch(selectInitialUserBudgetAction(userId)),
    fetchTotalTransactions: (userId) => dispatch(fetchTotalTransactionsAction(userId)),
    fetchUserBudget: (userId) => dispatch(fetchUserBudgetAction(userId)),
    dispatch
  }
}

export default withAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

// <Fragment>
//   <NavBar />
//   <Switch>
//     <Route exact path="/" render={() => <Redirect to="/profile" />} />
//     <Route exact path="/profile" component={Profile} />
//     <Route exact path="/login" component={LoginForm} />
//     <Route component={NotFound} />
//   </Switch>
// </Fragment>
