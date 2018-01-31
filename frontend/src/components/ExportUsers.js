import React from 'react'
import PropTypes from 'prop-types'
import mountAware from '../utils/mountAware'
import UserList from './UserList'
import LoadingSpinner from './LoadingSpinner'
import Resource from '../models/Resource';
import ErrorAlert from './ErrorAlert';

const ExportUsers = mountAware(({ users }) => (
  <div>
    <br />
    <h2>Export Users</h2>
    <p>Export users from the Keycloak.</p>
    {users.error ? <ErrorAlert error={users.error} /> : null}
    {users.value ? <UserList users={users.value} /> : null}
    {users.isLoading ? <LoadingSpinner /> : null}
  </div>
))

ExportUsers.propTypes = {
  users: PropTypes.instanceOf(Resource).isRequired,
}

export default ExportUsers
