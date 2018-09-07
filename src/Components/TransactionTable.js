import React from "react";
import { render } from "react-dom";
import { makeData, Tips } from "./Utils";
import { connect } from 'react-redux';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class TransactionTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  renderEditable(cellInfo) {
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
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "First Name",
              accessor: "firstName",
              Cell: this.renderEditable
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              Cell: this.renderEditable
            },
            {
              Header: "Full Name",
              id: "full",
              accessor: d =>
                <div
                  dangerouslySetInnerHTML={{
                    __html: d.firstName + " " + d.lastName
                  }}
                />
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
      </div>
    );
  }
}

export default connect()(TransactionTable)

// import React, { Component, Fragment } from 'react';
// import ReactTable from 'react-table';
// import '../Assets/css/react-table.css';
// import { connect } from 'react-redux';
//
// class BudgetPage extends Component {
//
//
//   render() {
//     console.log(this.props)
//     return (
//       <Fragment>
//         <p>Chart page!</p>
//       </Fragment>
//     )
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch
//   }
// }
//
// export default connect(mapStateToProps)(BudgetPage);
