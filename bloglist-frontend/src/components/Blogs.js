import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import { initializeBlogs, setBlogs } from '../reducers/blogsReducer'

const Blogs = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    props.setBlogs(blogs)
  }

  const handleLike = async blog => {
    await blogService.like(blog)
    getBlogs()
  }

  const removeBlog = async blog => {
    await blogService.remove(blog)
    getBlogs()
  }

  return (
    <div>
      <h1>Blogs</h1>
      {props.blogs.map(blog =>
        <Blog
          blog={blog}
          key={blog.id}
          likeHandler={handleLike}
          removeHandler={removeBlog}
          showRemove={props.user.id === blog.user.id ? true : false}
        />)}
    </div>
  )
}

const mapDispatchProps = {
  initializeBlogs,
  setBlogs
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchProps)(Blogs)

export default ConnectedBlogs
