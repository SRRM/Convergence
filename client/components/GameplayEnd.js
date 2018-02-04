/*
winning screen:

        You Won!
          WORD
    converged in 12 rounds
  game summary    play again?

losing screen:

                      Game over
    you guessed: userGuess    computer guessed: computerGuess
              game summary    try again?

*/

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import history from '../history'
import { resetGameThunkCreator } from '../reducer'


const GameplayEnd = (props) => {
  if (props.humanWord === props.machineWord /* props.game.status === "Converged" */) {
    return (
      <div className="overlay" >
        <h2>You Won!</h2>

        <h2>{props.machineWord}</h2>

        <h4>Successfully converged in {props.rounds.length - 1} rounds</h4>

        <div className="ui grid">
          <div
            className="ui grid eight wide column"
          >
            <div className="eight wide column">
              <button
                className="fluid ui button"
                onClick={() => {
                  history.push('/wordgraph')
                }}
              >
                GAME SUMMARY
              </button>
            </div>
            <div className="eight wide column">
              <button
                className="fluid ui button"
                onClick={props.setupGame}
              >
                PLAY AGAIN?
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (props.humanWord !== props.machineWord /* props.game.status === "Failed" */) {
    return (
      <div className="overlay" >
        <h2>Game Over!</h2>

        <h2>You guessed: {props.humanWord}</h2>

        <h2>Computer guessed: {props.machineWord}</h2>

        <div className="ui grid">
          <div
            className="ui grid eight wide column"
          >
            <div className="eight wide column">
              <button
                className="fluid ui button"
                onClick={() => {
                  history.push('/wordgraph')
                }}
              >
                GAME SUMMARY
              </button>
            </div>
            <div className="eight wide column">
              <button
                className="fluid ui button"
                onClick={props.setupGame}
              >
                TRY AGAIN?
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  game: state.game,
  rounds: state.rounds,
  machineWord: state.machineWord,
  humanWord: state.humanWord
})

const mapDispatch = dispatch => ({
  setupGame: () => {
    dispatch(resetGameThunkCreator())
    history.push('/gameplay/start')
  }
})

export default connect(mapState, mapDispatch)(GameplayEnd)
