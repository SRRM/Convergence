import React from 'react'
import {NavLink} from 'react-router-dom'
import {getFirstMachineWordThunkCreator} from '../reducer'
import store from '../store'
import history from '../history'


const handleClick = () => {
  store.dispatch(getFirstMachineWordThunkCreator())
  history.push('/tutorial/0')
}

export const LandingPage = () => {
  return (
      <div className="overlay">
      <div id="landing-page-info">
        <h1 id="title">Convergence</h1>
        <h2>
          A Game of Cooperative Word Alchemy
        </h2>
        
        
          <button
          id="center-action-button"
            className="ui button"
            onClick={handleClick}
          >
              START
          </button>
        </div>
      </div>
  )
}
