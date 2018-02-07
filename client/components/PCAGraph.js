import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Chart } from 'react-d3-core'
var ScatterPlot = require('react-d3-basic').ScatterPlot

const dummyData = [
  [2.5, 2.4],
  [0.5, 0.7],
  [2.2, 2.9],
  [1.9, 2.2],
  [3.1, 3.0],
  [2.3, 2.7],
  [2, 1.6],
  [1, 1.1],
  [1.5, 1.6],
  [1.1, 0.9]
].map(pair => ({
  x: pair[0],
  y: pair[1]
}));

console.log('visited PCA Graph')

const chartSeries = [
  {
    field: 'y',
    name: 'Y',
    color: '#000',
    symbol: 'diamond'
  }
];

const xAccessor = d => d.x

const yAccessor = d => d

class PCAGraph extends Component {
  constructor() {
    super();
    this.sideLength = 400
  }

  render() {
    return (
      // <Chart
      //   title="PCA"
      //   id="test-chart"
      //   width={this.sideLength + 50}
      //   height={this.sideLength + 50}
      // >
        <ScatterPlot
          data={dummyData}
          width={this.sideLength}
          height={this.sideLength}
          x={xAccessor}
          y={yAccessor}
          chartSeries={chartSeries}
          xDomain={[0, 4]}
          yDomain={[0, 4]}
        />
      // </Chart>
    )
  }
}
export default PCAGraph
