import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';

class BudgetPage extends Component {


  render() {
    return (
      <Fragment>
        
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

export default connect(mapStateToProps)(BudgetPage);
