import { connect } from 'react-redux'
import * as creators from '../actions/creators'
import NavigationBar from '../components/NavigationBar'

const mapStateToProps = state => {
  return {
    tabs: state.tabs,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelect: name => dispatch(creators.selectTab(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)
