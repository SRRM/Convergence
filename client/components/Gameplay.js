import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { incrementRoundActionCreator, storeHumanWordActionCreator, storeMachineWordActionCreator, postRoundThunkCreator, winGameThunkCreator, loseGameThunkCreator } from '../reducer'
import store from '../store'
import history from '../history'

class Gameplay extends Component {
    constructor() {
        super()
        this.state = {
            inputValue: '',
            emptyInput: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evt) {
        //
        //set state as teh last thing
        this.setState({ inputValue: evt.target.value })

    }

    handleClick(evt) {
        evt.preventDefault()
        // console.log('from form')
        const userGuess = this.state.inputValue.toLowerCase()
        this.setState({ inputValue: '' })
        // document.getElementById('user-guess-form-button').disabled = true;
        const computerGuess = store.getState().machineHiddenGuess
        const gameId = store.getState().game.id
        const personality = store.getState().personality
        const roundNumber = store.getState().roundNumber
        store.dispatch(storeHumanWordActionCreator(userGuess))
        store.dispatch(storeMachineWordActionCreator(computerGuess))
        if (userGuess === computerGuess) {
            // console.log('hooray!')
            // dispatch an action
            store.dispatch(winGameThunkCreator(gameId, userGuess, roundNumber))
            console.log('winning thunk dispatched!!!!')
            history.push(`/gameplay/${this.props.game.randId}/end`)
        } else if (roundNumber >= 20) {
            // dispatch lose game thunk creator
            // console.log('failure :(')
            store.dispatch(loseGameThunkCreator(gameId, userGuess, computerGuess, roundNumber))
            // console.log('losing thunk dispatched!!!!!!')
            history.push(`/gameplay/${this.props.game.randId}/end`)
        }
        else {
            //send this stuff to server so that AI can come up with response
            //server also replies with the complete round object
            store.dispatch(incrementRoundActionCreator())
            store.dispatch(postRoundThunkCreator(userGuess, computerGuess, gameId, personality, roundNumber))
        }

    }

    render() {
        const props = this.props
        return (
            <div className="overlay" >
                <div id="gameplay-content">

                    <h2 className="round-h2">Round <span>{props.roundNumber}</span> of 20</h2>
                    <div className="choice-info">
                        <div className="ui grid">
                            <div className="eight wide column">
                                <h2 className="choice-h2">You chose:</h2>
                                <h3 className="words-h3">{props.humanWord}</h3 >
                            </div>
                            <div className="eight wide column">
                                <h2 className="choice-h2">AI chose: </h2>
                                <h3 className="words-h3">{props.machineWord}</h3>
                            </div>
                        </div>
                    </div>

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
                                    onChange={this.handleChange}
                                    value={this.state.inputValue}
                                />
                            </div>
                            <div className="six wide column">
                                <button
                                    id="user-guess-form-button"
                                    className="fluid ui button"
                                    type="submit"
                                    disabled={!this.state.inputValue.length || this.props.awaitingReply}
                                >
                                    SUBMIT
                        </button>
                            </div>
                        </form>
                    </div>
                </div>
                {this.props.error &&
                    <div id="error-component">
                        <form
                            className="ui warning form"
                        >
                            <div className="ui warning message">
                                <div className="content">
                                    <div className="header">
                                        Error:
                                </div>
                                    <p>
                                        {this.props.error}
                                    </p>
                                </div>

                            </div>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

const mapState = state => ({
    roundNumber: state.roundNumber,
    machineWord: state.machineWord,
    humanWord: state.humanWord,
    awaitingReply: state.awaitingReply,
    error: state.error,
    game: state.game
})
export default connect(mapState)(Gameplay)
