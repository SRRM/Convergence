import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'
import { resetGameThunkCreator, getGameRoundsThunkCreator } from '../reducer'
// import {Container, Row, Col} from 'react-grid-system'
class WordGraph extends Component {
  constructor() {
    super();
    this.updateCanvas = this.updateCanvas.bind(this)
  }
  componentDidMount() {
    this.props.getGame()
    //  this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const arr = this.props.rounds
    const canvas = document.querySelector('#visualizer')
    canvas.setAttribute('width', document.querySelector('#canvas-wrapper').clientWidth)
    // canvas.setAttribute('height', document.querySelector('#canvas-wrapper').clientHeight)
    canvas.setAttribute('height', 16*44)
    const ctx = canvas.getContext('2d')

    const midpoint = document.querySelector('#canvas-wrapper').clientWidth / 2

    const wordHeight = 16
    const halfOfHeight = (wordHeight / 2) - 1
    const spaceBetweenLinesAndWords = wordHeight

    ctx.font = `${wordHeight}pt Arial`
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    const drawRow = (row, idx) => {
      const topEdge = wordHeight * 2 * idx
      const bottomEdge = topEdge + wordHeight
      const middle = topEdge + halfOfHeight
      const { word1, word2, dist } = row
      const lineLength = (dist) * 1000 + 3
      const lineOpacity = lineLength / 1003 * 0.9
      console.log(lineOpacity)
      // ctx.fillRect(0, topEdge, 900, 1)
      // ctx.fillRect(0, bottomEdge, 900, 1)
      ctx.fillStyle = `rgba(141, 132, 142, ${lineOpacity})`
      ctx.fillRect(midpoint - (lineLength / 2), middle, lineLength, 2)
      ctx.fillStyle = 'rgb(141, 132, 142)'
      ctx.textAlign = 'right'
      ctx.fillText(capitalize(word1), midpoint - (lineLength / 2) - spaceBetweenLinesAndWords, bottomEdge)
      ctx.textAlign = 'left'
      ctx.fillText(capitalize(word2), midpoint + (lineLength / 2) + spaceBetweenLinesAndWords, bottomEdge)
    }

    arr.forEach(drawRow)

  }

  render() {
    return (
      <div className='overlay'>

        <h2 className="page-title">Game Overview</h2>
        <div id="canvas-wrapper">
          <canvas id="visualizer"></canvas>
        </div>
        <div className="ui grid">
        <div className="five wide column"></div>
          <div className="three wide column">
            <button
              id="game-summary-play-button"
              className="fluid ui button"
              onClick={this.props.setupGame}
            >
              PLAY AGAIN?
              </button>
          </div>
          <div className="three wide column">
            <button
              id="game-summary-share-button"
              className="fluid ui button"
              onClick={() => window.alert("Copy this link to share: \n" + window.location)}
            >
              SHARE WITH FRIENDS
              </button>
          </div>
          <div className="five wide column"></div>
        </div>
      </div>

    )
  }
}

const mapState = state => ({
  rounds: state.rounds.map(round => ({ word1: round.userWord, dist: round.cosineDistance, word2: round.machineOneWord })),
})

const mapDispatch = (dispatch, ownProps) => ({
  setupGame: () => {
    dispatch(resetGameThunkCreator())
    history.push('/gameplay/start')
  },
  getGame: () => {
    dispatch(getGameRoundsThunkCreator(ownProps.gameId))
  }
})

export default connect(mapState, mapDispatch)(WordGraph)

/*


hardcode wordSpace
const yStep = height / 20


*/
