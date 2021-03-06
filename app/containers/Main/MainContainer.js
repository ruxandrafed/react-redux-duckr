import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') { // eslint-disable-line react/prop-types
          this.context.router.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  },
  render () {
    // while we check is user is auth, we don't render anything
    return this.props.isFetching === true
      ? null
      : <div className={container}>
          <Navigation isAuthed={this.props.isAuthed} />
          <div className={innerContainer}>
            {this.props.children}
          </div>
        </div>
  },
})

export default connect(
  ({users}) => ({
    isAuthed: users.isAuthed,
    isFetching: users.isFetching,
  }),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer)
