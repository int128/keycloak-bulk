import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavigationBar = ({ pathname, isAuthenticated }) => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">
      Keycloak Bulk
    </Link>
    {isAuthenticated ? (
      <ul className="navbar-nav mr-auto">
        <li className={`nav-item ${pathname === '/import' ? 'active' : ''}`}>
          <Link className="nav-link" to="/import">Import</Link>
        </li>
        <li className={`nav-item ${pathname === '/export' ? 'active' : ''}`}>
          <Link className="nav-link" to="/export">Export</Link>
        </li>
      </ul>
    ) : null}
  </nav>
)

NavigationBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default NavigationBar
