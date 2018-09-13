import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class TransactionTable extends React.Component {

  componentDidMount() {
    console.log(this.props.transactions)
    if (this.props.transactions && this.props.selectedBudgetCategoryIndex) {

      this.setState({
        data: this.props.transactions.map( el => {
          let newObj = {}

          this.props.selectedBudgetCategoryIndex.forEach( el2 => {
            if (el2.id == el.budget_category_id) {
              let stringifiedDate = (new Date(el.created_at)).toString();
              newObj = {budget_category_name: el2.title, displayTime: stringifiedDate }
            } else {null}
          })

          return Object.assign(newObj, el)
        }).reverse()
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.transactions && this.props.selectedBudgetCategoryIndex) {

      this.setState({
        data: this.props.transactions.map( el => {
          let newObj = {}

          this.props.selectedBudgetCategoryIndex.forEach( el2 => {
            if (el2.id == el.budget_category_id) {
              let stringifiedDate = (new Date(el.created_at)).toString();
              newObj = {budget_category_name: el2.title, displayTime: stringifiedDate }
            } else {null}
          })

          return Object.assign(newObj, el)
        }).reverse()
      })
    }
  }

    state = {
      data: []
    }

  renderEditable = (cellInfo) => {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          console.log('blur', e.target)
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
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
              Header: "Time",
              id: "displayTime",
              Cell: this.renderEditable
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

export default connect(mapStateToProps)(TransactionTable)
