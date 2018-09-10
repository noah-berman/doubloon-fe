import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchUserBudgetAction } from '../Actions';

class BudgetForm extends Component {

  state = {
    budget: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setBudget(this.state.transaction)
  }

  handleChange = (event) => {
    this.setState( { [event.target.name]: event.target.value})
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field onChange={this.handleChange}>
          <label>Enter Budget Amount</label>
          <input placeholder='Budget' type="number" name="transaction" />
        </Form.Field>

      </Form>
    )
  }

}
function mapStateToProps(state) {
  return {
    budget: state.budget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setBudget: (value) => dispatch(fetchUserBudgetAction(value)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetForm);
