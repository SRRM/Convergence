import React from 'react'
import {NavLink} from 'react-router-dom'


export const GameplayStart = () => {
    return (
        <div className="overlay" >
            <h2>Game Setup</h2>
           <span></span> 
           <form>
           <span>Personality:</span>
               <textarea>
                   </textarea>
                   <span>First word:</span>
               <input
                id="firstWord"
               />
               <button
                    type="button"
                    onClick={()=>{
                        submitHumanWordThunkCreator('word')
                    }}
                >
                    SUBMIT 
                </button>

                <NavLink to="/gameplay">
                    Gameplay
                </NavLink>
                
            </form>    
        </div>
    )
}