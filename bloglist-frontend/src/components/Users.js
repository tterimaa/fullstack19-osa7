import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import User from './User'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const data = await usersService.getAll()
      const users = data
        .filter(user => user.username !== 'root')
      setUsers(users)
    }
    getUsers()
  }, [])
  console.log(users)
  return (
    <div>
      <table>
        <h1>Users</h1>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <tr key={user.id}>
            <User user={user} />
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users
