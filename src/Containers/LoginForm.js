import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { loginUser } from '../Actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

class LoginForm extends React.Component {


  state = { username: '', password: ''}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.username, this.state.password);
    this.setState({ username: '', password: '' });
  }

  render() {
    return (
      <div>
      { this.props.loggedIn ?
      <Redirect to="/home" />
     :
      <Segment>
        <h2> Welcome to Doubloon </h2>
        <h4> please login below</h4>
        <Form
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message error header={this.props.failedLogin ? this.props.loginError : null} />
          <Form.Group widths="equal">
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
          <Button type="submit">Login</Button>
        </Form>
      </Segment>}
    </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticatingUser: state.user.authenticatingUser,
  failedLogin: state.user.failedLogin,
  loginError: state.user.error,
  user: state.user.username,
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch) => ({loginUser: bindActionCreators(loginUser, dispatch)})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
)
