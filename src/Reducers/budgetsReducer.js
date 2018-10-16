import { ADD_TRANSACTION, FETCH_USER_BUDGETS, SELECT_USER_BUDGET, SELECT_INITIAL_USER_BUDGET, RESET } from '../Actions/types';

const initialState = {
  userBudgets: null,
  selectedBudgetId: null,
  selectedBudgetName: null,
  selectedBudgetValue: null,
  totalSpend: null
};

function budgetsReducer(state=initialState, action) {
  if (action.payload) {
    switch (action.type) {
      case SELECT_INITIAL_USER_BUDGET:
        return {...state, selectedBudgetId: action.payload[0].id, selectedBudgetName: action.payload[0].title, selectedBudgetValue: action.payload[0].value}
      case FETCH_USER_BUDGETS:
        return {...state, userBudgets: action.payload};
      case SELECT_USER_BUDGET:
        return {...state, selectedBudgetId: action.payload.id, selectedBudgetName: action.payload.title, selectedBudgetValue: action.payload.value}
      case RESET:
        return initialState
      default:
        return state;
    }
  }
  else {return state}
}

export default budgetsReducer;
