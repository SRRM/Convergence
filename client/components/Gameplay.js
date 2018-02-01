import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {incrementRoundActionCreator, storeHumanWordActionCreator, storeMachineWordActionCreator, postRoundThunkCreator} from '../reducer'
import store from '../store'

const handleClick = evt => {
    evt.preventDefault()
    const userGuess = evt.target.userGuess.value
    const computerGuess = store.getState().machineHiddenGuess
    const gameId = store.getState().game.id
    const personality = store.getState().personality
    if (userGuess === computerGuess) console.log('hooray!')
    else {
        //send this stuff to server so that AI can come up with response
        //server also replies with the complete round object
        store.dispatch(incrementRoundActionCreator())
        store.dispatch(storeHumanWordActionCreator(userGuess))
        store.dispatch(storeMachineWordActionCreator(computerGuess))
        store.dispatch(postRoundThunkCreator(userGuess, computerGuess, gameId, personality ))
    }
}

const Gameplay = (props) => {
    return (     
        <div className="overlay" >
            <h2>Round #:<span>{props.roundNumber}</span></h2>
            
           <h2>Computer chose: <span>{props.machineWord}</span></h2>
           
           <h2>You chose: <span>{props.humanWord}</span></h2>
           
           <div className="ui grid">
           <form
           id="user-guess-form"
           onSubmit={handleClick}
           className="ui form grid eight wide column"
           >
           <div className="ten wide column">
               <input
                id="daInput"
                name="userGuess"
                placeholder="Enter your next guess"
               />
            </div>
            <div className="six wide column">
               <button
                className="fluid ui button"
                    type="submit"
                >
                    SUBMIT 
                </button>
            </div>
            </form>
             </div>
        </div>
    )
}

const mapState = state => ({
    roundNumber: state.roundNumber,
    machineWord: state.machineWord,
    humanWord: state.humanWord
})
export default connect(mapState)(Gameplay)
