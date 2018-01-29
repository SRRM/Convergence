import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import history from './history'
import Main from './components/Main'
import { LandingPage } from './components/LandingPage'
import store from './store'
import { axios } from 'axios'


class Routes extends Component {
  componentDidMount() {
    //do we need to load anything?
  }

  render() {
    // const { isLoggedIn } = this.props
    return (
      <Router history={history}>
        {/* <ErrorMessage/> */}
        <Main>
          <Switch>
            <Route
              component={LandingPage}
              exact
              path="/"
            />

            {/* <Route
              component={TutorialSlideOne}
              exact
              path="/tutorial/1"
            />

            <Route
              component={TutorialSlideTwo}
              exact
              path="/tutorial/2"
            />

            <Route
              component={TutorialSlideThree}
              exact
              path="/tutorial/3"
            />

            <Route
              component={GameplayStart}
              exact
              path="/gameplay/start"
            />

            <Route
              component={Gameplay}
              exact
              path="/gameplay"
            />

            <Route
              component={GameplaySummary}
              exact
              path="/gameplay/summary"
            /> */}

            {/* Displays our Login component as a fallback */}
            <Route component={LandingPage} />
          </Switch>
          <form onSubmit={
            (e) => {
              axios.post('/proof', { input: e.input.value })
                .then(res => res.data)
                .then(console.log)
            }
          }>
            <input name="input" />
            <button type='submit'>submit</button>
          </form>
        </Main>
      </Router>
    )
  }
}


const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // isLoggedIn: !!state.user.id,

  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      //   dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)
