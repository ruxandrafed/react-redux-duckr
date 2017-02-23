import React, { PropTypes } from 'react'
import { container, innerContainer } from './styles.css'

const Main = React.createClass({
  render () {
    return (
      <div className={container}>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

Main.propTypes = {
  children: PropTypes.node,
}

export default Main
