import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';

class BudgetPage extends Component {


  render() {
    console.log(this.props)
    return (
      <Fragment>
        <p>Chart page!</p>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default withAuth(connect(mapStateToProps)(BudgetPage));
