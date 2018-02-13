import { connect } from 'react-redux'
import * as creators from '../actions/creators'
import Home from '../components/Home'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: () => dispatch(creators.signin()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
