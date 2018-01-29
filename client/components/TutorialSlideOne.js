import React from 'react'
import {NavLink} from 'react-router-dom'

const slides = [
  <div>
    <h1>Tutorial</h1>
    <p>The objective of the game is to use wordplay to try to guess the same word as the computer.</p>
    <NavLink to="/gameplay">
      <button>next</button>
    </NavLink>
    <NavLink to="/tutorial/2">
      <button>next</button>
    </NavLink>
  </div>,

  <div>
  </div>
]

export const TutorialSlides = {matchParams} => {
  return slides[matchParams.slideNumber]
}

export const TutorialSlideOne = () => {
    return (
        <div >
        </div>
    )
}
