import React, { useEffect, useState } from 'react'
import usersService from '../services/users'

const User = ({ userId }) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    usersService.getUser(userId).then(user => setUser(user))
  }, [])
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs ? user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
          : <></>}
      </ul>
    </div>
  )
}

export default User
