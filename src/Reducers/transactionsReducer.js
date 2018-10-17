import { ADD_TRANSACTION, FETCH_TOTAL_TRANSACTIONS, RESET } from '../Actions/types';

const initialState = {
  totalTransactions: null,
  totalTransactionsValue: null,
  selectedTransactions: null,
  selectedTransactionsValue: null
};

function transactionsReducer(state=initialState, action) {
  if (action.payload) {
    switch (action.type) {
      case ADD_TRANSACTION:
        state.totalTransactions.unshift(action.payload.transaction)
        return {...state, totalTransactions: state.totalTransactions}
      case FETCH_TOTAL_TRANSACTIONS:
        let val = 0;
        action.payload.reduce( function(accumulator, currentValue) {accumulator + currentValue}, 0);
        return {...state, totalTransactions: action.payload, totalTransactionsValue: val}
      case RESET:
        return initialState
      default:
        return state;
    }
  } else {return state}
}

export default transactionsReducer;
