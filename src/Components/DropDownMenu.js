import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserBudgetAction, fetchTotalTransactionsAction } from '../Actions'

class DropDownMenu extends Component {

  componentDidMount() {
  }

  state = {
    showMenu: false,
  };


  showMenu = (event) => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu = (event) => {

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }

  renderDropDownMenuButtons = (arr) => {
    return arr.map ( el => <button onClick={this.handleBudgetSelection} key={el.id} id={el.id}> {el.title} </button> )
  }

  handleBudgetSelection = (event) => {
    this.selectBudget(event);
    this.fetchSpending(event);
  }

  selectBudget = (event) => {
    console.log('Selecting User Budget with ID of ', event.target.id)
    this.props.selectUserBudget(event.target.id);
  }

  fetchSpending = (event) => {
    console.log('Fetching Spending from User Budget with ID of ', event.target.id)
    this.props.fetchTotalTransactions(event.target.id)
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          Select Budget
        </button>

        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                {this.renderDropDownMenuButtons(this.props.budget)}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProps: state.user,
    budget: state.budget.userBudgets,
    transaction: state.transaction.totalTransactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectUserBudget: (budgetId) => dispatch(selectUserBudgetAction(budgetId)),
    fetchTotalTransactions: (budgetId) => dispatch(fetchTotalTransactionsAction(budgetId)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu)
