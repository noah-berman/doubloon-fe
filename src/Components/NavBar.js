import React from 'react'
import '../Assets/css/NavBar.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = (props) => {
  console.log(props);

  return (
    <div className="navbar">
      {/*
        <button onClick={() => props.handleClick('home')}>Home</button>
        <button onClick={() => props.handleClick('facts')}>Facts</button>
        <button onClick={() => props.handleClick('profiles')}>Profiles</button>
      */}
      <p>{props.counter}</p>
      <NavLink to="/home">Home</NavLink>
      <NavLink activeClassName="active" exact to="/budget">Budget</NavLink>
      <NavLink activeClassName="active" exact to="/charts">Charts</NavLink>
      <NavLink activeClassName="active" exact to="/logout">Logout</NavLink>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    counter: state.counter,
  }
}

export default connect(mapStateToProps)(NavBar);
