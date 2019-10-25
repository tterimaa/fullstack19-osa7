import blogService from '../services/blogs'

export const addBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.add(content)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export const setBlogs = blogs => {
    return async dispatch => {
      dispatch({
        type: 'SET',
        data: blogs
      })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT',
        data: blogs,
      })
    }
  }

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD': return [...state, action.data]
  case 'SET':
  case 'INIT': return action.data
  default: return state
  }
}

export default blogsReducer