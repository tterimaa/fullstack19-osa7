import React from 'react'

const User = ({ user }) => {
  return (
    <>
      <td><a href='#'>{user.username}</a></td>
      <td>{user.blogs.length}</td>
    </>
  )
}

export default User
