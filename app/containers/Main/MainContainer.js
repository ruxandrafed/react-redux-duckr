import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'

const Main = React.createClass({
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={true} />
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
