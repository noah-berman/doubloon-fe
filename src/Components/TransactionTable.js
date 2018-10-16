import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
import { updateTransactionAction, fetchUserBudgetAction, createBudgetCategoryAction } from '../Actions'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class TransactionTable extends React.Component {

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
          this.handleUpdateTransaction({id: cellInfo.original.id, columnName: cellInfo.column.id, newValue: e.target.innerHTML})
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  handleUpdateTransaction = (updateArgs) => {
    if (updateArgs.columnName !== 'budget_category_name' ) {
      this.props.updateTransaction(updateArgs)
    } else {
      if (!this.findBudgetCategoryId(updateArgs.newValue)) {
        this.props.createBudgetCategory({title: updateArgs.newValue, budgetId: this.props.selectedBudgetId})
        .then( json => this.props.updateTransaction( Object.assign( updateArgs, {columnName: 'budget_category_id', newValue: json.budget_category.id} ) ) )
      } else {
        let budgetCategoryId = this.findBudgetCategoryId(updateArgs.newValue)
        this.props.updateTransaction(Object.assign(updateArgs, {columnName: 'budget_category_id', newValue: budgetCategoryId}))
      }
    }
  }

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
    return (
      <div>
        <h1> Now displaying budget: {this.props.selectedBudgetName}</h1>
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
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transaction.totalTransactions,
    selectedBudgetName: state.budget.selectedBudgetName,
    selectedBudgetId: state.budget.selectedBudgetId,
    selectedBudgetCategoryIndex: state.budgetCategory.selectedBudgetCategoriesIndex
  }
}

// transactionId, columnName, newValue

function mapDispatchToProps(dispatch) {
  return {
    updateTransaction: (updateArgs) => dispatch(updateTransactionAction(updateArgs)),
    createBudgetCategory: ({title, budgetId}) => dispatch(createBudgetCategoryAction({title, budgetId})),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)
