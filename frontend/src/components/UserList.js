import React from 'react'
import PropTypes from 'prop-types'
import User from '../models/User'

const UserRow = ({ id, username, firstName, lastName, email }) => (
  <tr>
    <td>{id}</td>
    <td>{username}</td>
    <td>{firstName} {lastName}</td>
    <td>{email}</td>
  </tr>
)

const ExportUsers = ({ users }) => (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (<UserRow key={user.id} {...user.toJS() } />))}
    </tbody>
  </table>
)

ExportUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.instanceOf(User).isRequired).isRequired,
}

export default ExportUsers
