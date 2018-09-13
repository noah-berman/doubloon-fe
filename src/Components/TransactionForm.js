import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { addTransactionAction } from '../Actions'

class TransactionForm extends Component {

  state = {
    transaction: ""
  }

  handleSubmit = (event) => {
    this.setState({ transaction: "" })
    this.props.addTransaction(this.state.transaction)
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
    value: state.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTransaction: (value) => dispatch(addTransactionAction(value)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
