import { SELECT_USER_BUDGET, SELECT_INITIAL_USER_BUDGET, FETCH_USER_BUDGETS, RESET } from '../Actions/types';

const initialState = {
  selectedBudget: null,
  selectedBudgetCategoriesIndex: null,
};

function budgetCategoriesReducer(state=initialState, action) {
  if (action.payload) {
  switch (action.type) {
    case SELECT_INITIAL_USER_BUDGET:
      // return {...state, selectedBudgetId: action.payload[0].id, selectedBudgetName: action.payload[0].title, selectedBudgetValue: action.payload[0].value}
    case FETCH_USER_BUDGETS:
      // return {...state, userBudgets: action.payload};
    case SELECT_USER_BUDGET:
      // return {...state, selectedBudgetId: action.payload.id, selectedBudgetName: action.payload.title, selectedBudgetValue: action.payload.value}
    case RESET:
      return initialState
    default:
      return state;
    }
  } else {return state}
}

export default budgetCategoriesReducer;
