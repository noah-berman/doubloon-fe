import React, { Fragment } from "react";
import { BarChart } from "react-d3-components";
import { connect } from 'react-redux';
import { addTransactionAction } from '../Actions';

const BarChartContainer = (props) => {
  let data = [
    {
      label: "firstLayer",
      values: [
        { x: "SomethingA", y: props.budget },
        { x: "SomethingB", y: props.value },
        { x: "SomethingC", y: 3 }
      ]
    },
    {
      label: "secondLayer",
      values: [
        { x: "SomethingA", y: 0 },
        { x: "SomethingB", y: 4 },
        { x: "SomethingC", y: 3 }
      ]
    }
  ];
  return (
    <React.Fragment>
      <p>You have spent ${props.value} of your budget of ${props.budget}. <br />
      You have ${props.budget - props.value} remaining.</p>
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
    value: state.budget.value,
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
