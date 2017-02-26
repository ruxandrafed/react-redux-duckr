import auth from 'helpers/auth'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

// Actions
function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unAuthUser (uid) {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser (uid) {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (uid) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  }
}

function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

// The inner function receives the store methods dispatch and getState as parameters.

export function fetchAndHandleAuthedUser() {
  return function (dispatch) {
    dispatch(fetchingUser()) //  returns a promise
    return auth().then((user) => {
      dispatch(fetchingUserSuccess(user.uid, user, Date.now()))
      dispatch(authUser(user.uid))
    })
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
        }
    default :
      return state
  }
}
