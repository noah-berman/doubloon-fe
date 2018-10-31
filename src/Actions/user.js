import { SET_CURRENT_USER, AUTHENTICATING_USER, RESET } from './types';

export const token = localStorage.getItem('jwt');

//**TODO** come up with a better way to get the page to refresh to "home" once authed that doesn't require a timeout
const reloadPage = () => {setTimeout(function reload(){window.location.reload()}, 100)};

export const logOutAction = () => {
  return {type: RESET};
}

export const registerUser = (username, password) => {
  return dispatch => {
    dispatch(authenticatingUser())
    fetch(`http://localhost:3000/api/v1/users`,
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
    .then(res => res.json())
    // .then( ({ user, jwt }) =>
    //   {
    //     localStorage.setItem('jwt', jwt)
    //     dispatch(setCurrentUser(user))
    //   })
    // .then(reloadPage())
    }
  }

export const authenticateUserAndSetJWTToken = (username, password) => {
  return dispatch => {
    dispatch(authenticatingUser())
    return fetch(`http://localhost:3000/api/v1/login`,
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
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then( ({ user, jwt }) =>
      {
        localStorage.setItem('jwt', jwt)
        dispatch(setCurrentUser(user))
      })
    .catch( r => r.json().then(e => dispatch(failedLogin(e.message))))

    }
  }

export const loginUser = (username, password) => {
  return (dispatch, getState) => {
    return dispatch(authenticateUserAndSetJWTToken(username, password))
    .then(() => {
      if (!getState().user.failedLogin) {
        window.location.reload()
      }
    })
  }
}

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch('http://localhost:3000/api/v1/authenticate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
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
