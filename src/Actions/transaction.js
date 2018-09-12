import { ADD_TRANSACTION, FETCH_TOTAL_TRANSACTIONS, RESET} from './types';

export const token = localStorage.getItem('jwt')

export function addTransactionAction(value) {
  return { type: ADD_TRANSACTION, payload: value}
}



export const fetchTotalTransactionsAction = (id) => {
  return (dispatch) => {
  // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/budgets/${id}/all`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    ).then( res => res.json() )
    .then( json => dispatch({type: FETCH_TOTAL_TRANSACTIONS, payload: json}))
  }
}

export function logOutAction() {
  return { type : RESET }
}
