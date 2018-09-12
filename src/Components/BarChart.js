import React, { Fragment } from "react";
import { BarChart } from "react-d3-components";
import { connect } from 'react-redux';
import { addTransactionAction } from '../Actions';

const BarChartContainer = (props) => {
  let data = [
    {
      label: "firstLayer",
      values: [
        { x: "Budget", y: props.budget },
        { x: "Spending", y: props.transactionValue },
      ]
    }
  ];
  return (
    <React.Fragment>
      <p>You have spent ${props.transactionValue} of your budget of ${props.budget}. <br />
      You have ${props.budget - props.transactionValue} remaining.</p>
      <BarChart
        data={data}
        width={400}
        height={400}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />
    </React.Fragment>
  );
}

function mapStateToProps(state){
  return {
    transactionValue: state.transaction.totalTransactionsValue,
    budget: state.budget.selectedBudgetValue
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTransaction: (value) => dispatch(addTransactionAction(value)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartContainer);
