import React from 'react'
import {NavLink} from 'react-router-dom'

const slides = [
  <div className="overlay">
    <div className="tutorial-slide">
      <h2>Tutorial 1/3</h2>
      <p>
        At this moment, our AI has selected at random a starting word
        out of the most common 1500 nouns in the English language.
        At the beginning of the game, you will also get to pick your own starting word.
        Once the starting words are revealed, the objective of the game is try to guess
        the same word as the AI in subsequent rounds. 
        How might you accomplish such a challenging task?
      </p>
      <NavLink to="/gameplay">
        <button>next</button>
      </NavLink>
      <NavLink to="/tutorial/1">
        <button>next</button>
      </NavLink>
    </div>
  </div>,
  <div className="overlay">
    <div className="tutorial-slide">
      <h2>Tutorial 2/3</h2>
      <p>The key is to try to meet halfway by guessing words that have some semantic relationship
        to the words you and the AI have previously chosen. For example, if you choose 'lava' as 
        your first word, and the AI selects 'water', then 'liquid', 'caldera', and 'steam' might be 
        good guesses. You get a maximum of 20 chances to converge on the same word.</p>
      <NavLink to="/gameplay">
          <button>skip</button>
      </NavLink>
      <NavLink to="/tutorial/2">
          <button>next</button>
      </NavLink>
    </div>
  </div>,
  <div className="overlay">
    <div className="tutorial-slide">
    <h2>Tutorial 3/3</h2>
    <p>
      To help you and the AI cooperate better, you have the option of writing a 200 character description for the
      AIs personality. This will influence the kinds of words the AI guesses, so feel free to experiment
      and have fun. Best of luck!
    </p>
    
    <NavLink to="/gameplay/start">
        <button>Finish</button>
    </NavLink>
  </div>
 </div>
]

export const TutorialSlides = ({match}) => {
  return slides[match.params.slideNumber]
}

