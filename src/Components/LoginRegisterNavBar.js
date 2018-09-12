import React, { Component } from 'react'
import '../Assets/css/NavBar.css';
import { NavLink } from 'react-router-dom';
import { logOutAction } from '../Actions'
import { connect } from 'react-redux';

class LoginRegisterNavBar extends Component {

  handleLogout = (event) => {
    localStorage.removeItem('jwt');
    this.props.logOut();
  }

  render() {
    return (
      <div className="navbar">
        <NavLink activeClassName="active" exact to="/login">Login</NavLink>
        <NavLink activeClassName="active" exact to="/register">Register</NavLink>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(logOutAction()),
    dispatch

  }
}

export default connect(mapDispatchToProps)(LoginRegisterNavBar);
