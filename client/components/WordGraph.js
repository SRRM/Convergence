import React, {Component} from 'react'
import {Container, Row, Col} from 'react-grid-system'
export default class WordGraph extends Component {
  constructor(){
    super();
    this.updateCanvas = this.updateCanvas.bind(this)
  }
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    let arr = Object.keys(this.refs)
    let ctx
    let dist = [0.6,0.9]
    arr.map((obj,idx) => {
      ctx = this.refs[obj].getContext('2d');
      ctx.fillRect(250-(dist[idx]*225),10, dist[idx]*450, 10);
    })
  }

  render(){
    const arr = [
      { word1:'water', dist: 0.6, word2:'lava' },
      { word1:'water', dist: 0.9, word2:'sea'}
    ]
   return (
     <Container>
       {
         arr.map((obj, idx) => {
           return (
             <Row key = {idx}>
               <Col sm={2}>
                 {obj.word1}
               </Col>
               <Col sm={8} style = {{'textAlign':'center'}}>
                 <div><canvas ref= {'s'+idx} width = {500} height = {100}/></div>
               </Col>
               <Col sm={2}>
                 {obj.word2}
               </Col>
             </Row>
           )
         })
       }
     </Container>
   )
  }
}
