import { START_FETCHING_BUDGET_REQUEST, FETCH_USER_BUDGETS } from './types';

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

// ${process.env.REACT_APP_ENDPOINT_API_URL}
