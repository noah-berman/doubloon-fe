import { START_FETCHING_BUDGET_REQUEST, FETCH_USER_BUDGETS, SELECT_USER_BUDGET, SELECT_INITIAL_USER_BUDGET, RESET } from './types';

const token = localStorage.getItem('jwt')

export const fetchUserBudgetAction = (id) => {
  return (dispatch) => {
    // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/users/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    ).then( res => res.json() )
    .then( json => dispatch({type: FETCH_USER_BUDGETS, payload: json.budgets} ))
  }
}

export const selectUserBudgetAction = (id) => {
  console.log('selecting user budget action')
  return (dispatch) => {
  // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/budgets/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    ).then( res => res.json() )
    .then( json => dispatch({type: SELECT_USER_BUDGET, payload: json}))
  }
}

export const selectInitialUserBudgetAction = (id) => {
  return (dispatch) => {
  // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch(`http://localhost:3000/api/v1/users/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    ).then( res => res.json() )
    .then( json => dispatch({type: SELECT_INITIAL_USER_BUDGET, payload: json.budgets}))
  }
}

export function logOutAction() {
  return { type : RESET }
}

// ${process.env.REACT_APP_ENDPOINT_API_URL}
