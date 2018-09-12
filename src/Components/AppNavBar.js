import React, { Component } from 'react'
import '../Assets/css/NavBar.css';
import { NavLink } from 'react-router-dom';
import { logOutAction } from '../Actions'
import { connect } from 'react-redux';

class AppNavBar extends Component {

  handleLogout = (event) => {
    localStorage.removeItem('jwt');
    this.props.logOut();
  }

  render() {
    return (
      <div className="navbar">
        {/*
          <button onClick={() => props.handleClick('home')}>Home</button>
          <button onClick={() => props.handleClick('facts')}>Facts</button>
          <button onClick={() => props.handleClick('profiles')}>Profiles</button>
        */}
        <NavLink to="/home">Home</NavLink>
        <NavLink activeClassName="active" exact to="/budget">Budget</NavLink>
        <NavLink activeClassName="active" exact to="/logout" onClick={this.handleLogout}>Logout</NavLink>
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

export default connect(mapDispatchToProps)(AppNavBar);
