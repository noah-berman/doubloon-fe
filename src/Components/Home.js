import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ExampleForm from './ExampleForm'
import BarChart from './BarChart.js'

const Home = props => {
  return (
    <Fragment>
      <ExampleForm />
      <BarChart />
    </Fragment>
  )
}

export default connect()(Home);
