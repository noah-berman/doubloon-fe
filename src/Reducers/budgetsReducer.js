import { ADD_TRANSACTION, FETCH_USER_BUDGETS} from '../Actions/types';

const initialState = {
  userBudgets: null,
  selectedBudget: null,
  selectedBudgetValue: null,
};

function budgetsReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_USER_BUDGETS:
      return {...state, userBudgets: action.payload};
    default:
      return state;
  }
}

export default budgetsReducer;
