import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import history from '../history'
import { resetGameThunkCreator } from '../reducer'


const GameplayEnd = (props) => {
  if (props.humanWord === props.machineWord /* props.game.status === "Converged" */) {
    return (
      <div className="overlay" >
      <div className="game-over-info">
        <h2 className="winning">VICTORY!</h2>

        <h2>You both guessed "{props.machineWord}"</h2>

        <h4>It only took you {props.rounds.length - 1} rounds lol</h4>

        <div className="ui grid">
          <div className="eight wide column">
            <button
              className="ui button end-buttons"
              onClick={() => {
                history.push('/wordgraph')
              }}
            >
              GAME SUMMARY
              </button>
          </div>
          <div className="eight wide column">
            <button
              className="ui button end-buttons"
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
        <div className="game-over-info">
          <h2 className="losing">GAME OVER</h2>
          <div className=" ui grid">
            <div className="eight wide column">
              <h2 className="choice-h2">You guessed </h2>
              <h3 className="words-h3">{props.humanWord}</h3>
            </div>
            <div className="eight wide column">
              <h2 className="choice-h2">AI guessed </h2>
              <h3 className="words-h3">{props.machineWord}</h3>
            </div>
          </div>

          <div className="ui grid">
            <div className="eight wide column">
              <button
                className="ui button end-buttons"
                onClick={() => {
                  history.push('/wordgraph')
                }}
              >
                GAME SUMMARY
              </button>
            </div>
            <div className="eight wide column">
              <button
                className="ui button end-buttons"
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
