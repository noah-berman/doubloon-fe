import { START_FETCHING_BUDGET_REQUEST, FETCH_USER_BUDGETS, SELECT_USER_BUDGET, SELECT_INITIAL_USER_BUDGET, UPDATE_BUDGET_CATEGORY_INDEX, UPDATE_TOTAL_TRANSACTIONS, RESET } from './types';

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

export const createBudgetCategoryAction = (updateArgs) => {
  let fetchBody = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({'title': updateArgs.newValue, 'budget_id': updateArgs.budgetId})
  }


  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/budget_categories`, fetchBody)
    .then( res => res.json() )
    .then( json => {
      let updatedBudgetCategory = {id: json.budget_category.id, title: json.budget_category.title}
      updateArgs.index.push(updatedBudgetCategory)
      dispatch({type: UPDATE_BUDGET_CATEGORY_INDEX, payload: updateArgs.index, newCategory: updatedBudgetCategory })
    })
  }
}

export function updateTransactionAction(updateArgs, lastUpdated) {
  let {userId, transactionId, columnName, newValue} = {userId: updateArgs.userId, transactionId: updateArgs.transactionId, columnName: updateArgs.columnName, newValue: lastUpdated.id}
  let fetchBody =   {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({[columnName]: newValue})
    }


  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/transactions/${transactionId}`, fetchBody)
      .then( res => res.json() )
      .then( json => dispatch({type: UPDATE_TOTAL_TRANSACTIONS, payload: json}))
  }
}

export const createBudgetCategoryAndUpdateTransaction = (updateArgs) => {
  return (dispatch, getState) => {
    return dispatch(createBudgetCategoryAction(updateArgs))
    .then(() => {
      let lastUpdated = getState().budgetCategory.lastUpdatedBudgetCategory
      return dispatch(updateTransactionAction( updateArgs, lastUpdated ))
    })
  }
}

export function logOutAction() {
  return { type : RESET }
}

// ${process.env.REACT_APP_ENDPOINT_API_URL}
