import { ADD_TRANSACTION, SET_BUDGET } from '../Actions/types';

const initialState = {
  value: 0,
  budget: 0
};

function BudgetReducer(state=initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {...state, value: parseInt(state.value) + parseInt(action.payload)};
    case SET_BUDGET:
      return {...state, budget: parseInt(action.payload)};
    default:
      return state;
  }
}

export default BudgetReducer;
