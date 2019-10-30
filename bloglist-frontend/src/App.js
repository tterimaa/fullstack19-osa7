import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blogform from './components/Blogform'
import Toggleable from './components/Togglable'
import './index.css'
import Loginform from './components/Loginform'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { setUser, resetUser } from './reducers/usersReducer'
import { addBlog, setBlogs } from './reducers/blogsReducer'
import Users from './components/Users'
import User from './components/User'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = (props) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      props.setNotification('log in successfull', 'success', 10)
      blogService.setToken(user.token)
      props.setUser(user)
      username.reset()
      password.reset()
    } catch(exception) {
      console.log(exception)
      props.setNotification('wrong credentials', 'error', 10)
    }
  }

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    props.setBlogs(blogs)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }
  return (
    <div>
      <Router>
        <Notification />
        {!props.user.username ?
          <Loginform
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
          : <div>
            <p>{props.user.username} logged in
              <button onClick={handleLogout}>Log out</button>
            </p>
            <Route exact path="/" render={() =>
            <>
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
            <Blogs />
            </>}
            />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User userId={match.params.id}/>} />
          </div>
        }
      </Router>
    </div>
  )
}

const mapDispatchProps = {
  setNotification,
  addBlog,
  setBlogs,
  setUser,
  resetUser
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchProps)(App)

export default ConnectedApp