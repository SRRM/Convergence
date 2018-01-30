import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'

// import store, {getUsers} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children} = props
  return (
    <div id="main">
        {children}
    </div>
  )
}

const mapState = (state) => {
  return {
    // isLoggedIn: !!state.user.id,
    // isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
    //   dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))
