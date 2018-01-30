import React from 'react'
import {NavLink} from 'react-router-dom'



export const LandingPage = () => {
    return (
      <div >
        <div className="overlay">
          <h1 id="title">Convergence</h1>
          <h2>
            A Game of Cooperative Word Alchemy
          </h2>
          <NavLink to="/gameplay/summary"> <h2>Gameplay Summary[Dev]</h2></NavLink>
          <NavLink to="/tutorial/0">
            <button className="center-action-button">
                Play
            </button>
          </NavLink>
          <NavLink to="/wordgraph"> <h2> Word Graph </h2></NavLink>
        </div>
       
    </div>
  )
}
