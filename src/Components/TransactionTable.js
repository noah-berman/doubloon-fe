import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class TransactionTable extends React.Component {

  componentDidMount() {
    if (this.props.transactions !== null) {
      this.setState({data: this.props.transactions})
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.transactions)
    if (this.props.transactions !== prevProps.transactions) {
      this.setState({data: this.props.transactions})
    }
  }

    state = {
      data: []
    }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
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
    console.log(this.props)
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
              id: "budget_category_id",
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
    selectedBudgetName: state.budget.selectedBudgetName
  }
}

export default connect(mapStateToProps)(TransactionTable)
