import { START_FETCHING_BUDGET_REQUEST, FETCH_USER_BUDGETS, SELECT_USER_BUDGET } from './types';

const token = localStorage.getItem('jwt')

const bodyObj = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }

export const fetchUserBudgetAction = (id) => {
  return (dispatch) => {
    // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/users/${id}`, bodyObj)
    .then( res => res.json() )
    .then( json => dispatch({type: FETCH_USER_BUDGETS, payload: json.budgets} ))
  }
}

export const selectUserBudgetAction = (id) => {
  return (dispatch) => {
  // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/budgets/${id}`, bodyObj)
    .then( res => res.json() )
    .then( json => dispatch({type: SELECT_USER_BUDGET, payload: json}))
  }
}

export const fetchTotalTransactionsAction = (id) => {
  return (dispatch) => {
  // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/budgets/${id}/all`, bodyObj)
    .then( res => res.json() )
    .then( json => dispatch({type: SELECT_USER_BUDGET, payload: json}))
  }
}

// ${process.env.REACT_APP_ENDPOINT_API_URL}
