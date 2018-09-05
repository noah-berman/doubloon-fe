import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as actions from '../Actions'
import { addTransactionAction } from '../Actions';

class ExampleForm extends Component {

  state = {
    transaction: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("transaction value", this.props)
    this.props.addTransaction(this.state.transaction)
  }

  handleChange = (event) => {
    this.setState( { [event.target.name]: event.target.value})
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field onChange={this.handleChange}>
          <label>Enter Budget Transaction</label>
          <input placeholder='Transaction' type="number" name="transaction" />
        </Form.Field>

      </Form>
    )
  }

}
function mapStateToProps(state) {
  return {
    value: state.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTransaction: (value) => dispatch(addTransactionAction(value)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleForm);
