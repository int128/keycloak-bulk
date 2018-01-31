import { connect } from 'react-redux'
import * as creators from '../actions/creators'
import ImportUsers from '../components/ImportUsers';

const mapStateToProps = state => {
  return {
    text: state.importUsersText,
    importUsers: state.importUsers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTextChange: value => dispatch(creators.updateImportUsersText(value)),
    onSubmit: importUsers => dispatch(creators.executeImportUsers(importUsers)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportUsers)
