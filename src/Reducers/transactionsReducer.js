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

        if (!action.payload.error) {

          let newArr = [];
          for (let obj of action.payload) {
            for (let val in obj) {
              if (val === "value") {
                newArr.push(obj[val])
              }
            }
          }
          
          let val = newArr.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
          });

          return {...state, totalTransactions: action.payload, totalTransactionsValue: val}
        } else {return initialState}
      case RESET:
        return initialState
      default:
        return state;
    }
  } else {return state}
}

export default transactionsReducer;
