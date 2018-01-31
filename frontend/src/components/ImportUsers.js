import React from 'react'
import PropTypes from 'prop-types'
import ImportUsersInput from './ImportUsersInput'
import ImportUsersList from './ImportUsersList'
import ImportUsersApply from './ImportUsersApply'
import Resource from '../models/Resource';

const ImportUsers = ({ text, importUsers, statuses, onTextChange, onSubmit }) => (
  <div>
    <br />
    <h2>Import Users</h2>
    <p>Import users into the Keycloak.</p>

    <h3>Users</h3>
    <p>
      Enter users in CSV (comma) or TSV (tab).
      <br />
      Format: <code>Username,FirstName,LastName,Email,InitialPassword</code>
    </p>
    <ImportUsersInput value={text} onChange={onTextChange} />

    <h3>Preview</h3>
    <p>
      Following users will be imported:
    </p>
    <ImportUsersList importUsers={importUsers.value} />

    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Confirmation</h5>
        <p className="card-text">Click the button to import {importUsers.value.length} users to the Keycloak.</p>
        <ImportUsersApply resource={importUsers} onSubmit={e => onSubmit(importUsers.value)} />
      </div>
    </div>
  </div>
)

ImportUsers.propTypes = {
  text: PropTypes.string.isRequired,
  importUsers: PropTypes.instanceOf(Resource).isRequired,
  onTextChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ImportUsers
