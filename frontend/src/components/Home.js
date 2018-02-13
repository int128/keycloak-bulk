import React from 'react'
import PropTypes from 'prop-types'

const Home = ({ signin }) => (
  <div>
    <div className="jumbotron">
      <h1 className="display-4">Keycloak Bulk</h1>
      <p className="lead">A bulk operation tool for the Keycloak.</p>
      <hr className="my-4" />
      <p>This requires.</p>
      <a className="btn btn-primary" href="#signin" role="button" onClick={e => {
        e.preventDefault();
        return signin();
      }}>
        Sign in
      </a>
    </div>
  </div>
)

Home.propTypes = {
  signin: PropTypes.func.isRequired,
}

export default Home
