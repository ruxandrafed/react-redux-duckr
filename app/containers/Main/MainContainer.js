import React, { PropTypes } from 'react'

const Main = React.createClass({
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  },
})

Main.propTypes = {
  children: PropTypes.node,
}

export default Main
