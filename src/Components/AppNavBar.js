import React, { Component, Fragment } from 'react'
import '../Assets/css/NavBar.css';
import { NavLink } from 'react-router-dom';
import { logOutAction } from '../Actions'
import { connect } from 'react-redux';

class AppNavBar extends Component {

  handleLogout = (event) => {
    localStorage.removeItem('jwt');
    this.props.logOut();
    window.location.reload()

  }

  render() {
    return (
      <React.Fragment>
        <p className="logged-in-bar">Logged in as: {this.props.user.username}</p>
        <div className="navbar">
          {/*
            <button onClick={() => props.handleClick('home')}>Home</button>
            <button onClick={() => props.handleClick('facts')}>Facts</button>
            <button onClick={() => props.handleClick('profiles')}>Profiles</button>
          */}
          <NavLink to="/home">Home</NavLink>
          <NavLink activeClassName="active" exact to="/budgets">Budgets</NavLink>
          <NavLink activeClassName="active" exact to="/transactions">Transactions</NavLink>
          <NavLink activeClassName="active" exact to="/login" onClick={this.handleLogout}>Logout</NavLink>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(logOutAction()),
    dispatch

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);
