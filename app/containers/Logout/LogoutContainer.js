import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Logout } from 'components'
import { logoutAndUnauth } from 'redux/modules/users'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  },
  render () {
    return (
      <Logout />
    )
  },
})

export default connect()(LogoutContainer)

// because we only have one action we care about,
// we don't bind action creators and specify which ones
// we want to bind with mapDispatchToProps, but just use
// this.props.dispatch
