import { ADD_TRANSACTION, FETCH_TOTAL_TRANSACTIONS } from '../Actions/types';

const initialState = {
  totalTransactions: null
};

function transactionsReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_TOTAL_TRANSACTIONS:
      let transactionValue = 0;
      action.payload.map(el => {transactionValue += el.value })
      return {...state, totalTransactions: transactionValue}
    default:
      return state;
  }
}

export default transactionsReducer;
