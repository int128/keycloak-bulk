import React from 'react'
import PropTypes from 'prop-types'
import ImportUser from '../models/ImportUser'
import Resource from '../models/Resource';
import LoadingSpinner from './LoadingSpinner';
import User from '../models/User';
import ErrorAlert from './ErrorAlert';

const Badge = ({ type, children }) =>
  (<span className={`badge badge-${type} text-uppercase`}>{children}</span>)

const ResourceColumn = ({ resource }) => (
  <div>
    {resource.isLoading ? <LoadingSpinner /> : null}
    {resource.value ? (
      <div>
        <Badge type="success">Created</Badge>
      </div>
    ) : null}
    {resource.error ? <ErrorAlert error={resource.error} /> : null}
  </div>
)

const UserRow = ({ index, user, resource }) => (
  <tr>
    <td>{index+1}</td>
    <td>{user.username}</td>
    <td>{user.firstName} {user.lastName}</td>
    <td>{user.email}</td>
    <td>{user.initialPassword}</td>
    <td>
      {resource ?
        <ResourceColumn resource={resource} /> :
        <Badge type="secondary">Queued</Badge>}
    </td>
  </tr>
)

UserRow.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  resource: PropTypes.instanceOf(Resource),
}

const ImportUsersList = ({ importUsers }) => (
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Username</th>
        <th>Name</th>
        <th>Email</th>
        <th>Initial Password</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {importUsers.map((importUser, index) => (<UserRow key={index} index={index} {...importUser.toJSON()} />))}
    </tbody>
  </table>
)

ImportUsersList.propTypes = {
  importUsers: PropTypes.arrayOf(PropTypes.instanceOf(ImportUser).isRequired).isRequired,
}

export default ImportUsersList
