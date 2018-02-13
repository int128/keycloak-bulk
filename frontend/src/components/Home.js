import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Home = ({ isAuthenticated }) => (
  <div>
    <div className="jumbotron mt-5">
      <h1 className="display-4">Keycloak Bulk</h1>
      <p className="lead">A bulk operation tool for the Keycloak.</p>
      <hr className="my-4" />
      {isAuthenticated ? null : (
        <Link className="btn btn-primary" to="/signin" role="button">Sign in</Link>
      )}
    </div>
  </div>
)

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

export default Home
