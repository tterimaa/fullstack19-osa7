export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: {
        user
      }
    })
  }
}

export const resetUser = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_USER'
    })
  }
}

const usersReducer = (state = {}, action) => {
  switch(action.type) {
  case 'SET_USER':
    return { ...action.data.user }
  case 'RESET_USER':
    return {}
  default: return state
  }
}

export default usersReducer