import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { registerUser } from '../Actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

class RegisterForm extends React.Component {

  componentDidMount() {
    console.log('RegisterForm mounting')
  }

  state = { name: '', username: '', password: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleRegisterSubmit = () => {
    this.props.registerUser(this.state.username, this.state.password)
    this.setState({ name: '', username: '', password: '' })
  }

  render() {
    return (
      <div>
      { this.props.loggedIn ?
      <Redirect to="/home" />
     :
      <Segment>
        <Form
          onSubmit={this.handleRegisterSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedRegister}
        >
          <Message error header={this.props.failedRegister ? this.props.RegisterError.message : null} />
          <Form.Group widths="equal">
            <Form.Input
              label="name"
              placeholder="name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </Segment>}
    </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticatingUser: state.user.authenticatingUser,
  failedRegister: state.user.failedLogin,
  RegisterError: state.user.error,
  user: state.user.username,
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch) => ({registerUser: bindActionCreators(registerUser, dispatch)})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterForm)
)
