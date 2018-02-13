import React from 'react'
import PropTypes from 'prop-types'
import ImportUsers from '../containers/ImportUsers'
import ExportUsers from '../containers/ExportUsers';
import Home from '../containers/Home';

const TabContent = ({ name }) => {
  switch (name) {
    case 'home': return <Home />;
    case 'export': return <ExportUsers />;
    case 'import': return <ImportUsers />;
    default:
      return null;
  }
}

TabContent.propTypes = {
  name: PropTypes.string.isRequired,
}

export default TabContent
