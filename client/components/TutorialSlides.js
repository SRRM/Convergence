import React from 'react'
import {NavLink} from 'react-router-dom'

const slides = [
  <div className="tutorial-slide">
    <h2>Tutorial</h2>
    <p>The objective of the game is to use wordplay to try to guess the same word as the computer.</p>
    <NavLink to="/gameplay">
      <button>next</button>
    </NavLink>
    <NavLink to="/tutorial/2">
      <button>next</button>
    </NavLink>
  </div>,
  <div className="tutorial-slide">
    <h2>Tutorial (Continued)</h2>
    <p>The objective of the game is to use wordplay to try to guess the same word as the computer.</p>
    <NavLink to="/gameplay">
        <button>skip</button>
    </NavLink>
    <NavLink to="/gameplay">
        <button>next</button>
    </NavLink>
  </div>
]

export const TutorialSlides = ({match}) => {
  return slides[match.params.slideNumber]
}

