import React from 'react'
import PropTypes from 'prop-types'

const onClick = (name, onSelect) => e => {
  e.preventDefault();
  onSelect(name);
}

const NavigationBar = ({ tabs, onSelect }) => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <a className="navbar-brand" href="/">Keycloak Bulk</a>
    <ul className="navbar-nav mr-auto">
      {tabs.map(({ name, label, active }) => (
        <li key={name} className={`nav-item ${active === true ? 'active' : ''}`}>
          <a className="nav-link" href={`#${name}`} onClick={onClick(name, onSelect)}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

NavigationBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
    }).isRequired
  ),
  onSelect: PropTypes.func.isRequired,
}

export default NavigationBar
