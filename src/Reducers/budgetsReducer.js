import { ADD_TRANSACTION, FETCH_USER_BUDGETS, SELECT_USER_BUDGET} from '../Actions/types';

const initialState = {
  userBudgets: null,
  selectedBudgetId: null,
  selectedBudgetValue: null,
  totalSpend: null
};

function budgetsReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_USER_BUDGETS:
      return {...state, userBudgets: action.payload};
    case SELECT_USER_BUDGET:
      return {...state, selectedBudgetId: action.payload.id, selectedBudgetValue: action.payload.value}
    default:
      return state;
  }
}

export default budgetsReducer;
