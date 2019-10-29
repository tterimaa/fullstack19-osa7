import blogService from '../services/blogs'

export const addBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.add(content)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const setBlogs = blogs => {
  return async dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_BLOG': return [...state, action.data]
  case 'SET_BLOGS':
  case 'INIT_BLOGS': return action.data
  default: return state
  }
}

export default blogsReducer