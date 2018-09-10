import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchUserBudgetAction } from '../Actions';
import withAuth from '../hocs/withAuth';

import TransactionForm from '../Components/TransactionForm';
import BudgetForm from '../Components/BudgetForm';
import BarChart from '../Components/BarChart.js';
import DropDownMenu from '../Components/DropDownMenu.js';

class Home extends Component {

  componentDidMount() {
    this.props.setBudget(this.props.user.id)
      // fetch('http://localhost:3000/api/v1/users/1')
      //   .then( res => res.json() )
      //   .then( json => console.log(json))
      //   // .then( json => this.props.dispatch(createBudgetAction(json.value)))
    }


  render() {
    console.log(this.props)
    return (
      <Fragment>
        <DropDownMenu />
        <TransactionForm />
        <BudgetForm />
        <BarChart />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    budget: state.budget.userBudgets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBudget: (userId) => dispatch(fetchUserBudgetAction(userId)),
    dispatch
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home));
