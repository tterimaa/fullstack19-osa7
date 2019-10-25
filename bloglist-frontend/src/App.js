import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import Toggleable from './components/Togglable'
import './index.css'
import Loginform from './components/Loginform'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs, setBlogs } from './reducers/blogsReducer'

const App = (props) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    props.setBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      props.setNotification('log in successfull', 'success', 10)
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch(exception) {
      console.log(exception)
      props.setNotification('wrong credentials', 'error', 10)
    }
  }

  const addBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    await props.addBlog(newBlog)
    getBlogs()
    setNewBlogTitle('')
    setNewBlogUrl('')
    setNewBlogAuthor('')
    props.setNotification(`blog ${newBlog.title} by ${newBlog.author} added`, 'success', 10)
  }

  const handleLike = async blog => {
    await blogService.like(blog)
    getBlogs()
  }

  const removeBlog = async blog => {
    await blogService.remove(blog)
    getBlogs()
  }

  const rows = () => {
    return props.blogs.map(blog =>
      <Blog
        blog={blog}
        key={blog.id}
        likeHandler={handleLike}
        removeHandler={removeBlog}
        showRemove={user.id === blog.user.id ? true : false}
      />
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  return (
    <div>
      <Notification />

      {user === null ?
        <Loginform
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
        : <div>
          <p>{user.name} logged in
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Toggleable buttonLabel='new blog'>
            <Blogform
              submit={addBlog}
              changeTitle={setNewBlogTitle}
              changeAuthor={setNewBlogAuthor}
              changeUrl={setNewBlogUrl}
              titleValue={newBlogTitle}
              authorValue={newBlogAuthor}
              urlValue={newBlogUrl}
            />
          </Toggleable>
          <h1>Blogs</h1>
          <ul>
            {rows()}
          </ul>
        </div>
      }
    </div>
  )
}

const mapDispatchProps = {
  setNotification,
  addBlog,
  initializeBlogs,
  setBlogs
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchProps)(App)

export default ConnectedApp