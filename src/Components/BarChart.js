import React from "react";
import { BarChart } from "react-d3-components";
import { connect } from 'react-redux';
import { addTransactionAction } from '../Actions';

const BarChartContainer = (props) => {
  console.log(props)
  let data = [
    {
      label: "somethingA",
      values: [
        { x: "SomethingA", y: props.value },
        { x: "SomethingB", y: 4 },
        { x: "SomethingC", y: 3 }
      ]
    },
    {
      label: "somethingB",
      values: [
        { x: "SomethingA", y: 50 },
        { x: "SomethingB", y: 4 },
        { x: "SomethingC", y: 3 }
      ]
    }
  ];
  return (
    <BarChart
      data={data}
      width={400}
      height={400}
      margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
    />
  );
}

function mapStateToProps(state){
  return {
    value: state.budget.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTransaction: (value) => dispatch(addTransactionAction(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartContainer);
