import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { incrementRoundActionCreator, storeHumanWordActionCreator, storeMachineWordActionCreator, postRoundThunkCreator, winGameThunkCreator, loseGameThunkCreator } from '../reducer'
import store from '../store'
import history from '../history'

class Gameplay extends Component {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(evt)  {
        evt.preventDefault()
        const userGuess = evt.target.userGuess.value
        evt.target.userGuess.value = '';
        // document.getElementById('user-guess-form-button').disabled = true;
        const computerGuess = store.getState().machineHiddenGuess
        const gameId = store.getState().game.id
        const personality = store.getState().personality
        const roundNumber = store.getState().roundNumber
        store.dispatch(storeHumanWordActionCreator(userGuess))
        store.dispatch(storeMachineWordActionCreator(computerGuess))
        if (userGuess === computerGuess) {
            console.log('hooray!')
            // dispatch an action
            store.dispatch(winGameThunkCreator(gameId, userGuess, roundNumber))
            console.log('winning thunk dispatched!!!!')
            history.push('/gameplay/end')
        } else if (roundNumber === 5) {
            // dispatch lose game thunk creator
            console.log('failure :(')
            store.dispatch(loseGameThunkCreator(gameId, userGuess, computerGuess, roundNumber))
            console.log('losing thunk dispatched!!!!!!')
            history.push('/gameplay/end')
    
        }
        else {
            //send this stuff to server so that AI can come up with response
            //server also replies with the complete round object
            store.dispatch(incrementRoundActionCreator())
            store.dispatch(postRoundThunkCreator(userGuess, computerGuess, gameId, personality, roundNumber))
            
        }
    
    }

    render(){
        const props = this.props
        return (
            <div className="overlay" >
                <h2>Round <span>{props.roundNumber}</span>/20</h2>

                <h2>Computer chose: <span>{props.machineWord}</span></h2>

                <h2>You chose: <span>{props.humanWord}</span></h2>

                <div className="ui grid">
                    <form
                        id="user-guess-form"
                        onSubmit={this.handleClick}
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
                                id="user-guess-form-button"
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
}   

const mapState = state => ({
    roundNumber: state.roundNumber,
    machineWord: state.machineWord,
    humanWord: state.humanWord
})
export default connect(mapState)(Gameplay)
