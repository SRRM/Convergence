import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {resetGameThunkCreator} from '../reducer'
// import {Container, Row, Col} from 'react-grid-system'
class WordGraph extends Component {
 constructor(){
   super();
   this.updateCanvas = this.updateCanvas.bind(this)
 }
 componentDidMount() {
   this.updateCanvas();
 }


 updateCanvas(){
  const arr = this.props.rounds
  const canvas = document.querySelector('#visualizer')
  canvas.setAttribute('width', document.querySelector('#canvas-wrapper').clientWidth)
  canvas.setAttribute('height', document.querySelector('#canvas-wrapper').clientHeight)
  const ctx = canvas.getContext('2d')

  const midpoint = document.querySelector('#canvas-wrapper').clientWidth / 2

  const wordHeight = 16
  const halfOfHeight = (wordHeight / 2) - 1
  const spaceBetweenLinesAndWords = wordHeight

  ctx.font = `${wordHeight}pt Arial`
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  const drawRow = (row, idx)=> {
    const topEdge = wordHeight * 2 * idx
    const bottomEdge = topEdge + wordHeight
    const middle = topEdge + halfOfHeight
    const {word1, word2, dist} = row
    const lineLength = (dist) * 300 + 3
    const lineOpacity = lineLength/303 * 0.4
    // console.log(lineOpacity)
    // ctx.fillRect(0, topEdge, 900, 1)
    // ctx.fillRect(0, bottomEdge, 900, 1)
    ctx.fillStyle = `rgba(141, 132, 142, ${lineOpacity})`
    ctx.fillRect(midpoint - (lineLength / 2 ), middle, lineLength, 2)
    ctx.fillStyle = 'rgb(141, 132, 142)'
    ctx.textAlign = 'right'
    ctx.fillText(capitalize(word1), midpoint - (lineLength / 2 ) - spaceBetweenLinesAndWords, bottomEdge)
    ctx.textAlign = 'left'
    ctx.fillText(capitalize(word2), midpoint + (lineLength / 2 ) + spaceBetweenLinesAndWords, bottomEdge)
  }

  arr.forEach(drawRow)

 }

 render(){




  return (
    <div  className='overlay'>
    <h2 className= "page-title">Game Overview</h2>

      <div id="canvas-wrapper">
        <canvas id="visualizer"></canvas>
      </div>
      <div className="ui grid">


            <div className="eight wide column">
              <button
                className="fluid ui button"
                onClick={this.props.setupGame}
              >
                PLAY AGAIN?
              </button>
          </div>
        </div>
  </div>
  )
 }
}

const mapState = state => ({
  rounds: state.rounds.map(round => ({word1: round.userWord, dist: round.cosineDistance, word2: round.machineOneWord}))
  //cosineDistance
  //machneOneWord
  //userWord
})

const mapDispatch = dispatch => ({
  setupGame: () => {
    dispatch(resetGameThunkCreator())
    history.push('/gameplay/start')
  }
})

export default connect(mapState, mapDispatch)(WordGraph)

/*


hardcode wordSpace
const yStep = height / 20


*/
