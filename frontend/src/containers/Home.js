import { connect } from 'react-redux'
import Home from '../components/Home'

const mapStateToProps = state => {
  return {
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
)(Home)
