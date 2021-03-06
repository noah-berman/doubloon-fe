import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { selectInitialUserBudgetAction, fetchTotalTransactionsAction, fetchUserBudgetAction} from '../Actions'
import Home from './Home.js';
import AppNavBar from '../Components/AppNavBar.js';
import TransactionPage from './TransactionPage.js';
import LoginForm from './LoginForm.js'
import withAuth from '../hocs/withAuth.js'



class Main extends Component {

  componentDidMount() {
    this.props.selectInitialBudget(this.props.user.id);
    this.props.fetchUserBudget(this.props.user.id);
    this.props.fetchTotalTransactions(this.props.user.id);

  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.selectInitialBudget(this.props.user.id)
      this.props.fetchUserBudget(this.props.user.id)
      this.props.fetchTotalTransactions(this.props.user.id)
    }
  }

  render() {
    return (
      <Router >
        <div className="App">
          <AppNavBar />
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/transactions" component={TransactionPage} />
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
    user: state.user.user,
    budgetCategory: state.budgetCategory.selectedBudgetCategoriesIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectInitialBudget: (userId) => dispatch(selectInitialUserBudgetAction(userId)),
    fetchTotalTransactions: (userId) => dispatch(fetchTotalTransactionsAction(userId)),
    fetchUserBudget: (userId) => dispatch(fetchUserBudgetAction(userId)),
    dispatch
  }
}

export default withAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)));
