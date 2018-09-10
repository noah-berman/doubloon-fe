import { SET_CURRENT_USER, AUTHENTICATING_USER } from './types';

export const loginUser = (username, password) => {
  return dispatch => {
    dispatch(authenticatingUser())
    fetch(`http://localhost:3000/api/v1/login`,
      {
        method: 'POST',
        headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        body: JSON.stringify(
          {
            user:
              {
                username: username,
                password: password
              }
          }
        )
      }
    )
    .then(response => response.json())
    .then( ({ user, jwt }) =>
      {
        localStorage.setItem('jwt', jwt)
        dispatch(setCurrentUser(user))
      })
    }
  }

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch('http://localhost:3000/api/v1/authenticate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then(({ user }) => dispatch(setCurrentUser(user)))
  }
}

export const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })
