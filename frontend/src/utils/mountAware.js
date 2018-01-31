import React from 'react'

export default renderer => class extends React.Component {
  render() {
    return renderer(this.props);
  }
  componentDidMount() {
    this.props.onMount();
  }
}
