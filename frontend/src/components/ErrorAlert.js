import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ResourceError from '../models/ResourceError'

const ErrorAlert = ({ error }) => {
  if (error.status === 401) {
    return (
      <div className="alert alert-info" role="alert">
        Session has been expired. Please <Link to="/signin">sign in</Link>.
      </div>
    )
  }
  return (<div className="alert alert-danger" role="alert">{error.message}</div>)
}

ErrorAlert.propTypes = {
  error: PropTypes.instanceOf(ResourceError).isRequired,
}

export default ErrorAlert
