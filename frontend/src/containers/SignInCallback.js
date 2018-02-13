import { connect } from 'react-redux'
import * as creators from '../actions/creators'
import SignInProgress from '../components/SignInProgress';

const mapStateToProps = state => {
  return {
    signInRequest: state.signInRequest,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => dispatch(creators.createSession()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInProgress)
