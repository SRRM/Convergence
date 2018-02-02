import React, {Component} from 'react'
// import {Container, Row, Col} from 'react-grid-system'
export default class WordGraph extends Component {
 constructor(){
   super();
   this.updateCanvas = this.updateCanvas.bind(this)
 }
 componentDidMount() {
   this.updateCanvas();
 }

 
 updateCanvas(){
  const arr = [
    { word1:'ruby', dist: 0.05, word2:'rails' },
    { word1:'java', dist: 0.11, word2:'script' },
    { word1:'bone', dist: 0.21, word2:'thug' },
    { word1:'harmony', dist: 0.25, word2:'dissonance' },
    { word1:'apple', dist: 0.31, word2:'pie' },
    { word1:'peach', dist: 0.35, word2:'cobbler' },
    { word1:'mango', dist: 0.43, word2:'bango' },
    { word1:'fish', dist: 0.45, word2:'graph' },
    { word1:'ant', dist: 0.50, word2:'waterbear' },
    { word1:'algorithm', dist: 0.45, word2:'science' },
    { word1:'math', dist: 0.40, word2:'numbers' },
    { word1:'pi', dist: 0.35, word2:'rational' },
    { word1:'irrational', dist: 0.30, word2:'logic' },
    { word1:'releases', dist: 0.20, word2:'pies'},
    { word1:'rereleases', dist: 0.15, word2:'desserts' },
    { word1:'specials', dist: 0.43, word2:'pastas'},
    { word1:'appetizers', dist: 0.54, word2:'dishes' },
    { word1:'appetizer', dist: 0.60, word2:'salads'},
    { word1:'dumplings', dist: 0.7, word2:'soups' },
    { word1:'stews', dist: 1.0, word2:'stews'}
  ]
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
    const lineLength = (1 - dist) * 300 + 3
    const lineOpacity = lineLength/303 * 0.4
    console.log(lineOpacity)
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
  </div>
  )
 }
}

/*


hardcode wordSpace
const yStep = height / 20


*/