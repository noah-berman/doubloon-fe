import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { addTransactionAction } from '../Actions'

class TransactionForm extends Component {

  state = {
    transaction: ""
  }

  //**TODO** Fix Budget Category data transfer from backend?
  //Converts Budget Category Title into its ID
  findBudgetCategoryId = (budgetCategoryStr) => {
    let matchedBudgetCategory = this.props.selectedBudgetCategoryIndex.find( obj => {
      return obj.title.toLowerCase() === budgetCategoryStr.toLowerCase()
    })
    return matchedBudgetCategory.id
  }

  //**TODO** Fix default to budget_category_id = 1; if it's not the first budget
  // it would need a new Miscellaneous category
  inputParse = (val, inputLength) => {
    if (inputLength < 3) { //e.g. if user doesn't put in a budget category
      return {
        value: val[0],
        description: val[1],
        budget_category_id: 1, //default to "Miscellaneous"
      }
    } else if (inputLength === 3){
      return {
        value: val[0],
        description: val[1],
        budget_category_id: this.findBudgetCategoryId(val[2])
      }
    } else {null}
  }

  //**TODO** confirmation warning upon submission - "did you mean to input xyx?"
  handleSubmit = (event) => {
    let inputArr = this.state.transaction.split(' ');
    this.props.addTransaction(this.inputParse(inputArr, inputArr.length));
    this.setState({
      transaction: ''
    })
    window.location.reload();
  }

  handleChange = (event) => {
    this.setState( { [event.target.name]: event.target.value})
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field >
          <label>Enter Budget Transaction</label>
            <Form.Input
              placeholder="Enter Transaction"
              name="transaction"
              onChange={this.handleChange}
              value={this.state.transaction}
            />
        </Form.Field>

      </Form>
    )
  }

}
function mapStateToProps(state) {
  return {
    selectedBudgetCategoryIndex: state.budgetCategory.selectedBudgetCategoriesIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTransaction: (value) => dispatch(addTransactionAction(value)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
