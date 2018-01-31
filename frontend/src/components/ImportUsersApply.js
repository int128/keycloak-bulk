import React from 'react'
import PropTypes from 'prop-types'
import LoadingSpinner from './LoadingSpinner';
import Resource from '../models/Resource';
import ErrorAlert from './ErrorAlert';

const Submit = () => (
  <button type="submit" className="btn btn-primary">
    Import Users
  </button>
)

const ImportUsersApply = ({ resource, onSubmit }) => (
  <form onSubmit={e => { onSubmit(); e.preventDefault() }}>
    {resource.isLoading === true ? <LoadingSpinner /> : <Submit />}
    {resource.error ? <ErrorAlert error={resource.error} /> : null}
  </form>
)

ImportUsersApply.propTypes = {
  resource: PropTypes.instanceOf(Resource).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ImportUsersApply
