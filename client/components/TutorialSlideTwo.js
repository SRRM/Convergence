import React from 'react'
import {NavLink} from 'react-router-dom'



export const TutorialSlideTwo = () => {
    return (
       
        <div >
           <h1>Tutorial (Continued)</h1>
           <p>The objective of the game is to use wordplay to try to guess the same word as the computer.</p>
           <NavLink to="/gameplay">
                <button>skip</button>
            </NavLink>
           <NavLink to="/gameplay">
                <button>next</button>
            </NavLink>
        </div>
    )
}