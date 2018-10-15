import { ADD_TRANSACTION, FETCH_TOTAL_TRANSACTIONS, RESET} from './types';

export const token = localStorage.getItem('jwt')

export function addTransactionAction(value) {

  return (dispatch) => {
    // dispatch({type: START_FETCHING_BUDGET_REQUEST});
    return fetch('http://localhost:3000/api/v1/transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(value)
      }
    ).then( res => res.json() )
    .then( json => dispatch({type: ADD_TRANSACTION, payload: json}))
  }
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

export function updateTransactionAction(updateArgs) {
  let {id, columnName, newValue} = {id: updateArgs.id, columnName: updateArgs.columnName, newValue: updateArgs.newValue}
  let fetchBody =   {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({[columnName]: newValue})
    }

  console.log(fetchBody)

  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/transactions/${id}`, fetchBody)
      .then( res => res.json() )
      .then( json => console.log(json) )
      .then( json => dispatch({type: FETCH_TOTAL_TRANSACTIONS, payload: json}) )
    }
  }


export function logOutAction() {
  return { type : RESET }
}
