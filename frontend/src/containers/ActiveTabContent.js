import { connect } from 'react-redux'
import TabContent from '../components/TabContent'

const mapStateToProps = state => {
  return {
    name: state.tabs.filter(tab => tab.active === true).map(tab => tab.name).join(),
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContent)
