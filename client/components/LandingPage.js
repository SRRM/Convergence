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
        <NavLink to="/gameplay/summary"> <h2>Gameplay Summary[Dev]</h2></NavLink>
        
          <button
          id="center-action-button"
            className="ui button"
            onClick={handleClick}
          >
              START
          </button>
        
        <NavLink to="/wordgraph"> <h2> Word Graph </h2></NavLink>
        </div>
      </div>
  )
}
