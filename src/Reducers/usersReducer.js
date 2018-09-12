import { RESET } from '../Actions/types'

const initialState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

const usersReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      //action.payload {username: 'Chandler Bing', bio: 'my user bio', avatar: 'some image url'}
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case 'AUTHENTICATING_USER':
      return { ...state, authenticatingUser: true }
    case 'AUTHENTICATED_USER':
      return { ...state, authenticatingUser: false }
    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    case RESET:
      console.log('hitting reset reducer case');
      return initialState
    default:
      return state
  }
}

export default usersReducer
