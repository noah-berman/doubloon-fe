import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TransactionTable from '../Components/TransactionTable.js';
import withAuth from '../hocs/withAuth';

class TransactionPage extends Component {


  render() {
    return (
      <Fragment>
        <TransactionTable />
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

export default connect(mapStateToProps)(TransactionPage);
