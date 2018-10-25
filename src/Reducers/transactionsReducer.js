import { ADD_TRANSACTION, FETCH_TOTAL_TRANSACTIONS, RESET, UPDATE_TOTAL_TRANSACTIONS } from '../Actions/types';

const initialState = {
  totalTransactions: null,
  totalTransactionsValue: null,
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
      case UPDATE_TOTAL_TRANSACTIONS:
        console.log('update total transactions reducer');
        let updatedTransactionIndex = state.totalTransactions.findIndex(function(obj) {return obj.id === action.payload.id})
        let newTransactionsArr = Object.assign([], state.totalTransactions, {[updatedTransactionIndex]: action.payload})

        let newArr = [];
        for (let obj of newTransactionsArr) {
          for (let val in obj) {
            if (val === "value") {
              newArr.push(obj[val])
            }
          }
        }

        let newVal = newArr.reduce(function(accumulator, currentValue) {
          return accumulator + currentValue;
        });

        return {totalTransactions: newTransactionsArr, totalTransactionsValue: newVal}

      case RESET:
        return initialState;
      default:
        return state;
    }
  } else {return state}
}

export default transactionsReducer;
