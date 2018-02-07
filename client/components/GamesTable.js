import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPastGamesThunkCreator } from '../reducer'
import store from '../store'
import history from '../history'


class GamesTable extends Component {
  // constructor(){
  //   super()
  // }

  componentDidMount() {
    this.props.getGameHistory(this.props.page)
  }

  render() {
    const games = this.props.gameHistory
    return (
      <div className="overlay">
      <h2 className= "page-title">Game History</h2>
      <div className="summary-table">
        <table className="ui selectable table">
          <thead className="history-table-head">
            <tr>
              <th>Date</th>
              <th>First User Word</th>
              <th>First AI Word</th>
              <th>Rounds</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game =>
              (
                <tr key={game.randId} onClick={() => history.push(`/games/${game.randId}`)}>
                  <td>{game.createdAt.slice(0, 10)}</td>
                  <td>{game.userWord}</td>
                  <td>{game.machineOneWord}</td>
                  <td>{game.roundCount}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
            </tr>
          </tfoot>
        </table>
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  gameHistory: state.gameHistory,
  page: ownProps.page
})

const mapDispatch = (dispatch) => ({
  getGameHistory: (page) => {
    dispatch(getPastGamesThunkCreator(page))
  }
})

export default connect(mapState, mapDispatch)(GamesTable)
