export const setNotification = (text, notiftype, time) => {
  const timeInMs = time * 1000
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIF',
      data: {
        text,
        notiftype
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'EMPTY_NOTIF'
      })
    }, timeInMs)
  }
}

const notificationReducer = (state = { text: '', type: '' }, action) => {
  switch(action.type) {
  case 'SET_NOTIF':
    return {
      text: action.data.text,
      type: action.data.notiftype
    }
  case 'EMPTY_NOTIF': return { text: '', type: '' }
  default: return state
  }
}

export default notificationReducer