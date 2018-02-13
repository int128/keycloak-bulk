import { connect } from 'react-redux'
import NavigationBar from '../components/NavigationBar'

const mapStateToProps = state => {
  return {
    pathname: state.router.location.pathname,
    isAuthenticated: state.signIn.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)
