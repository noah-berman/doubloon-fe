import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
import { updateTransactionAction, fetchUserBudgetAction } from '../Actions'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class TransactionTable extends React.Component {

  //state gets set to generated transaction objects
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

  renderEditable = (cellInfo) => {
    return (
      <div
        id={cellInfo.original.id}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          console.log("cellInfo.column.id", cellInfo.column.id)
          console.log(typeof cellInfo.original.id)
          console.log(e.target)
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
          this.props.updateTransaction({id: cellInfo.original.id, columnName: cellInfo.column.id, newValue: e.target.innerHTML})
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
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
    selectedBudgetCategoryIndex: state.budgetCategory.selectedBudgetCategoriesIndex
  }
}

// transactionId, columnName, newValue

function mapDispatchToProps(dispatch) {
  return {
    updateTransaction: (updateArgs) => dispatch(updateTransactionAction(updateArgs)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)
