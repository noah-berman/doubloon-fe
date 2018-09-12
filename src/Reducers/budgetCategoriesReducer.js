import { ADD_TRANSACTION, SET_BUDGET, RESET } from '../Actions/types';

const initialState = {
  userBudgets: null,
  selectedBudget: null,
  selectedBudgetValue: null,
};

function budgetCategoriesReducer(state=initialState, action) {
  if (action.payload) {
  switch (action.type) {
    case FETCH_BUDGETS:
      return {...state, userBudgets: parseInt(state.value) + parseInt(action.payload)};
    case RESET:
      console.log('hitting reset reducer case');
      return initialState
    default:
      return state;
    }
  } else {return state}
}

export default budgetCategoriesReducer;
