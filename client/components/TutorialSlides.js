import React from 'react'
import {NavLink} from 'react-router-dom'

const slides = [
  <div className="overlay">
    <div className="tutorial-slide">
      <h2>Tutorial 1/3</h2>
      <p className="tutorial-p">
        Our AI has just picked a word
        from the most common nouns in the English language.
        At the beginning of the game, you will also get to choose your own starting word.
        Once these words are revealed, your objective is to guess
        the same word as the AI. How might you accomplish such a challenging task?
      </p>
      <div className="tutorial-links">
        <NavLink to="/" >
          <i className="chevron circle left icon"></i>
        </NavLink>
        <NavLink to="/gameplay/start" className="skip-link">
          <span >SKIP</span>
        </NavLink>
        <NavLink to="/tutorial/1" className="right-arrow">
          <i className="chevron circle right icon" ></i>
        </NavLink>
      </div>
    </div>
  </div>,
  <div className="overlay">
    <div className="tutorial-slide">
      <h2>Tutorial 2/3</h2>
      <p className="tutorial-p">The key is to try to meet halfway. For example, if you choose 'lava' as 
        your first word, and the AI selects 'water', then 'liquid', 'caldera', and 'steam' might be 
        good guesses. You get a maximum of 20 chances to converge on the same word.</p>
        <div className="tutorial-links">
        <NavLink to="/tutorial/0" >
          <i className="chevron circle left icon"></i>
        </NavLink>
        <NavLink to="/gameplay/start" className="skip-link">
          <span >SKIP</span>
        </NavLink>
        <NavLink to="/tutorial/2" className="right-arrow">
          <i className="chevron circle right icon" ></i>
        </NavLink>
      </div>
    </div>
  </div>,
  <div className="overlay">
    <div className="tutorial-slide">
    <h2>Tutorial 3/3</h2>
    <p className="tutorial-p">
      To help you and your AI cooperate better, you have the option of telling your AI what it likes. This will influence the kinds of words it guesses, so feel free to experiment
      and have fun. Best of luck!
    </p>
    
    <div className="tutorial-links">
        <NavLink to="/tutorial/1" >
          <i className="chevron circle left icon"></i>
        </NavLink>
        <NavLink to="/gameplay/start" className="skip-link">
          <span className="special-text">READY?</span>
        </NavLink>
        <NavLink to="/gameplay/start" className="right-arrow">
          
        </NavLink>
      </div>
  </div>
 </div>
]

export const TutorialSlides = ({match}) => {
  return slides[match.params.slideNumber]
}

