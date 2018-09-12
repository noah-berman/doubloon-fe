import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { selectInitialUserBudgetAction, fetchTotalTransactionsAction, fetchUserBudgetAction} from '../Actions'
import Home from './Home.js';
import AppNavBar from '../Components/AppNavBar.js';
import BudgetPage from './BudgetPage.js';
import LoginForm from './LoginForm.js'
import withAuth from '../hocs/withAuth.js'



class Main extends Component {

  componentDidMount() {
    console.log('mounting')
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
          <AppNavBar />
            <Switch>
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

export default withAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)));
