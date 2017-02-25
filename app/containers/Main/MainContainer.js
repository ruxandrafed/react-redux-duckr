import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'

const MainContainer = React.createClass({
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

MainContainer.propTypes = {
  children: PropTypes.node,
  isAuthed: PropTypes.bool.isRequired,
}

export default connect(
  (state) => ({
    isAuthed: state.isAuthed
  })
)(MainContainer)
