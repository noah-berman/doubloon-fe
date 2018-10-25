import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
import { fetchUserBudgetAction, createBudgetCategoryAndUpdateTransaction } from '../Actions'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class TransactionTable extends React.Component {


  //**TODO** Add a data field to each transaction (stored in backend and referenceable in state)
  // that toggles between showing Last Updated and Created in the table

  //transaction objects get set to state
  updateState() {
    this.setState({
      data: this.props.transactions.map( el => {
        let newObj = {}

        this.props.selectedBudgetCategoryIndex.forEach( el2 => {
          if (el2.id == el.budget_category_id) {
            let stringifiedDate = (new Date(el.created_at)).toString(); //converting transaction time into format to pass to cell
            newObj = {budget_category_name: el2.title, displayTime: stringifiedDate }
          } else {null}
        })

        return Object.assign(newObj, el)
      }).reverse()
    })
  }

  componentDidMount() {
    if (this.props.transactions && this.props.selectedBudgetCategoryIndex) {
      this.updateState()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.transactions && this.props.selectedBudgetCategoryIndex) {
      this.updateState()
    }
  }

  state = {
    data: []
  }

  findBudgetCategoryId = (budgetCategoryStr) => {
    try {
      let matchedBudgetCategory = this.props.selectedBudgetCategoryIndex.find( obj => {
        return obj.title.toLowerCase() === budgetCategoryStr.toLowerCase()
      })
      return matchedBudgetCategory.id
    }
    catch (e) {
      return null
    }
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        id={cellInfo.original.id}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.updateState({ data });
          this.handleUpdateTransaction({userId: this.props.user.id, transactionId: cellInfo.original.id, columnName: cellInfo.column.id, newValue: e.target.innerHTML})

        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  handleUpdateTransaction = (updateArgs) => {
    if (updateArgs.columnName !== 'budget_category_name' ) { //If editing any data field except the budget category name
      this.props.updateTransaction(updateArgs) //update transaction as normal
    }
    else {

      if (!this.findBudgetCategoryId(updateArgs.newValue)) { //if editing budget category and its ID is undefined or doesn't exist
        this.props.createBudgetCategoryAndUpdateTransaction( Object.assign(updateArgs, {budgetId: this.props.selectedBudgetId, index: this.props.selectedBudgetCategoryIndex, columnName: 'budget_category_id'}) ) //create a new one and update this transaction to the newly created budget category
      }
      else { //if budget category Id does exist, simply find the name's corresponding id and update transaction to that
        let budgetCategoryId = this.findBudgetCategoryId(updateArgs.newValue)
        this.props.updateTransaction(Object.assign(updateArgs, {columnName: 'budget_category_id', newValue: budgetCategoryId}))
      }
    }
  }

  // Last Updated timestamp field should not be editable
  renderUneditable = (cellInfo) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {
    const { data } = this.state;
    if (this.props.selectedBudgetName) {
      return (
        <div>
          <h2> Now displaying budget: {this.props.selectedBudgetName}</h2>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Transaction Value ($)",
                accessor: "value",
                Cell: this.renderEditable
              },
              {
                Header: "Transaction Description",
                accessor: "description",
                Cell: this.renderEditable
              },
              {
                Header: "Budget Category",
                id: "budget_category_name",
                Cell: this.renderEditable
              },
              {
                Header: "Time / Last Updated",
                id: "displayTime",
                Cell: this.renderUneditable
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <h4> No transactions to show. Create a budget to get started. </h4>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    transactions: state.transaction.totalTransactions,
    selectedBudgetName: state.budget.selectedBudgetName,
    selectedBudgetId: state.budget.selectedBudgetId,
    selectedBudgetCategoryIndex: state.budgetCategory.selectedBudgetCategoriesIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createBudgetCategoryAndUpdateTransaction: (updateArgs) => dispatch(createBudgetCategoryAndUpdateTransaction(updateArgs)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)
