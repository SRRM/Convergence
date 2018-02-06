import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import history from './history'
import Main from './components/Main'
import {GameplaySummary } from './components/GameplaySummary'
import { LandingPage } from './components/LandingPage'
import  WordGraph  from './components/WordGraph'
import { TutorialSlides } from './components/TutorialSlides'
import Gameplay from './components/Gameplay'
import GameplayStart from './components/GameplayStart'
import {Background} from './components/Background'
import GameplayEnd from './components/GameplayEnd'

import store from './store'
import axios from 'axios'
import Particles from 'react-particles-js'

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

            <Route
              component={GameplayEnd}
              exact path="/gameplay/end"
            />

            {/* Displays LandingPage as a fallback */}
            <Route component={LandingPage} />
          </Switch>
          <Particles
            className="particles"
            params={{
              particles: {
                line_linked: {
                  opacity: 0.8,
                  width: 2,
                  shadow: {
                    enable: true,
                    color: '#F97CA0',
                    blur: 7
                  }
                },
                shape: {
                  type: "polygon",
                  polygon: {
                    nb_sides: 5
                  },
                },
                size: {
                  value: 10,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 80,
                    size_min: 0.1,
                    sync: false
                  }
                }
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(#C9D2F2, #F9D9EA, #F7D091)'
            }}
          />
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
