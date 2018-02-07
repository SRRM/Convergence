import Proptypes from 'prop-types'
import React, { Component } from 'react'
React.PropTypes = Proptypes
import { connect } from 'react-redux'
// import { Chart } from 'react-d3-core'
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory'

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

// const dummyData = [
//   {
//     label: 'dummyStuff',
//     values: dummyArray
//   }
// ]

console.log('visited PCA Graph')

const chartSeries = [
  {
    field: 'y',
    name: 'Y',
    color: '#000',
    symbol: 'diamond'
  }
];

// const xAccessor = d => d.x
// const yAccessor = d => d

class PCAGraph extends Component {
  constructor() {
    super();
    this.sideLength = 400
  }

  render() {
    return (
      <div className="overlay">
        <VictoryChart
          theme={VictoryTheme.grayscale}
          domain={{ x: [0, 5], y: [0, 7] }}
          id={'pca-chart'}
        >
          <VictoryScatter
            style={{ data: { fill: "#000" } }}
            size={2}
            data={dummyData}
          />
        </VictoryChart>
      </div>
    )
  }
}
export default PCAGraph
