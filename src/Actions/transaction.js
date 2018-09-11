import { ADD_TRANSACTION, FETCH_TOTAL_TRANSACTIONS} from './types';

const token = localStorage.getItem('jwt')

const bodyObj = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }

export function addTransactionAction(value) {
  return { type: ADD_TRANSACTION, payload: value}
}

export const fetchTotalTransactionsAction = (id) => {
  return (dispatch) => {
  // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/budgets/${id}/all`, bodyObj)
    .then( res => res.json() )
    .then( json => dispatch({type: FETCH_TOTAL_TRANSACTIONS, payload: json}))
  }
}
