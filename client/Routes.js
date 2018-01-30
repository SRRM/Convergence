import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import history from './history'
import Main from './components/Main'
import {GameplaySummary } from './components/GameplaySummary'
import { LandingPage } from './components/LandingPage'
import  WordGraph  from './components/WordGraph'
import { TutorialSlides } from './components/TutorialSlides'
import {Gameplay} from './components/Gameplay'
import {GameplayStart} from './components/GameplayStart'
import {Background} from './components/Background'

import store from './store'
import axios from 'axios'


class Routes extends Component {
  componentDidMount() {
    //do we need to load anything?
  }

  render() {
    // const { isLoggedIn } = this.props
    return (
      <Router history={history}>

        <Main>
          <Switch>
            <Route
              component={LandingPage}
              exact path="/"
            />


            <Route
             component={WordGraph}
             exact path="/wordgraph"
             />
              {/*
              
            <Route
              component={GameplaySummary}
              exact path="/gameplay/summary"
            />

             <Route
              component={TutorialSlides}
              exact
              path="/tutorial/:slideNumber"
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




            {/* Displays our Login component as a fallback */}
            <Route component={LandingPage} />
          </Switch>
          {/* <form onSubmit={
            (e) => {
              e.preventDefault()
              axios.post('/proof', { input: e.target.input.value })
                .then(res => res.data)
                .then(console.log)
            }
          }>
            <input name="input" />
            <button type='submit'>submit</button>
          </form> */}
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
