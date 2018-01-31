import React from 'react'
import {NavLink} from 'react-router-dom'
import history from '../history'
import store from '../store'
import {setupGameThunkCreator, storeHumanWordActionCreator} from '../reducer'

const handleClick = (evt) => {
    evt.preventDefault()
    const computerWord = store.getState().machineWord
    const personality = evt.target.personality.value
    const userWord = evt.target.word.value
    store.dispatch(storeHumanWordActionCreator(userWord))
    store.dispatch(setupGameThunkCreator(personality, userWord, computerWord))
    history.push(`/gameplay`)
}
export const GameplayStart = () => {
    return (
        <div className="overlay" >
            <h2>Game Setup</h2>
           <span></span> 
           <form
            onSubmit={handleClick}
           >
           <span>Personality:</span>
               <textarea 
                id="personality-textarea"
                name="personality"
                >
                   </textarea>
                   <span>First word:</span>
               <input
                id="firstWord"
                name="word"
               />
               <button
                    type="submit"
                >
                    SUBMIT 
                </button>
                
            </form>    
        </div>
    )
}