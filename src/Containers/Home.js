import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { selectInitialUserBudgetAction, fetchTotalTransactionsAction, fetchUserBudgetAction } from '../Actions';
import withAuth from '../hocs/withAuth';

import TransactionForm from '../Components/TransactionForm';
import BudgetForm from '../Components/BudgetForm';
import BarChart from '../Components/BarChart.js';
import PieChart from '../Components/PieChart.js';
import DropDownMenu from '../Components/DropDownMenu.js';

class Home extends Component {

  componentDidMount() {

      // fetch('http://localhost:3000/api/v1/users/1')
      //   .then( res => res.json() )
      //   .then( json => console.log(json))
      //   // .then( json => this.props.dispatch(createBudgetAction(json.value)))
    }


  render() {
    return (
      <Fragment>
        <DropDownMenu />
        <br />
        <TransactionForm />
        <BarChart />

      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    budget: state.budget.userBudgets,
    transactionValue: state.transaction.totalTransactionsValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInitialBudget: (userId) => dispatch(selectInitialUserBudgetAction(userId)),
    fetchTotalTransactions: (userId) => dispatch(fetchTotalTransactionsAction(userId)),
    fetchUserBudget: (userId) => dispatch(fetchUserBudgetAction(userId)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
