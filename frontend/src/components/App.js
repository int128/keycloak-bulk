import React from 'react'
import ActiveTabContent from '../containers/ActiveTabContent'
import NavigationBar from '../containers/NavigationBar';

const App = () => (
  <div>
    <NavigationBar />
    <div className="container">
      <ActiveTabContent />
    </div>
    <div className="mt-5 p-3 bg-dark">
      <p>Keycloak Bulk</p>
    </div>
  </div>
)

export default App
