import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TransactionForm from './TransactionForm';
import BudgetForm from './BudgetForm';
import BarChart from './BarChart.js';
import { createBudgetAction } from '../Actions';

class Home extends Component {

  componentDidMount() {
      fetch('http://localhost:3000/api/v1/budgets/1')
        .then( res => res.json() )
        .then( json => this.props.dispatch(createBudgetAction(json.value)))
    }


  render() {
    console.log(this.props)
    return (
      <Fragment>
        <TransactionForm />
        <BudgetForm />
        <BarChart />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    value: state.budget.value,
    budget: state.budget.budget
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBudget: (value) => dispatch(createBudgetAction(value)),
    dispatch
  }
}

export default connect(mapStateToProps)(Home);
