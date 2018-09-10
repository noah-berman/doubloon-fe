import { ADD_TRANSACTION, SET_BUDGET } from '../Actions/types';

const initialState = {
  userBudgets: null,
  selectedBudget: null,
  selectedBudgetValue: null,
};

function budgetCategoriesReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_BUDGETS:
      return {...state, userBudgets: parseInt(state.value) + parseInt(action.payload)};
    default:
      return state;
  }
}

export default budgetCategoriesReducer;
