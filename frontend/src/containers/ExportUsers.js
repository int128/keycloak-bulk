import { connect } from 'react-redux'
import * as creators from '../actions/creators'
import ExportUsers from '../components/ExportUsers';

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => dispatch(creators.loadUsers()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportUsers)
