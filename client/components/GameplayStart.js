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
            <h2 className="page-title">Game Setup</h2>
            <div className="game-setup"> 
                <form
                    id="game-setup-form"
                    className="ui form"
                    onSubmit={handleClick}
                >
                    <textarea
                        placeholder="Enter a personality for the AI"
                        id="personality-textarea"
                        name="personality"
                        >
                        </textarea>
                    <div id="first-word-form-subsection" className="ui grid">
                        <div className="eight wide column">
                            <input
                                id="firstWord"
                                name="word"
                                placeholder="Enter your starting word"
                            />
                        </div>
                        <div className="eight wide column">
                            <button
                                type="submit"
                                className="fluid ui button"
                            >
                                BEGIN 
                            </button>
                        </div>
                    </div>

                    <div className="ui error message">
                        <div className="content">
                            <div classNAme="header">
                            </div>
                            <p></p>
                        </div>
                        
                    </div>
                </form>  
            </div>  
        </div>
    )
}