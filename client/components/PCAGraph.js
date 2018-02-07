import Proptypes from 'prop-types'
import React, { Component } from 'react'
React.PropTypes = Proptypes
import { connect } from 'react-redux'
// import { Chart } from 'react-d3-core'
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryAxis } from 'victory'
import { getPCAThunkCreator } from '../reducer';

const dummyData = [
  [2.5, 2.4, 'hello'],
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
  y: pair[1],
  label: pair.length>2 ? pair[2] : undefined
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
    this.sideLength = 600
  }

  componentDidMount(){
    this.props.getPCA()
  }

  render() {
    return (
      <div className="overlay">
        <VictoryChart
          theme={VictoryTheme.grayscale}
          domain={{ x: [-0.25, 0.25], y: [-0.25, 0.25] }}
          height={this.sideLength}
          width={this.sideLength}
          id={'pca-chart'}
        >

          <VictoryScatter
            style={{ data: { fill: "#fa0" } }}
            size={2}
            data={this.props.PCA}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
      </div>
    )
  }
}

const mapState = state => ({
  PCA: state.PCA
})

const mapDispatch = dispatch => ({
  getPCA: () => {
    dispatch(getPCAThunkCreator())
  }
})

export default connect(mapState, mapDispatch)(PCAGraph)
