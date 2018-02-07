import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getPastGamesThunkCreator } from '../reducer'
import store from '../store'
import history from '../history'


class GamesTable extends Component {
  render() {
    return (
      <div className='overlay'>
      <div className="history-table">
        <table className="ui selectable celled table">
          <thead>
            <tr>
              <th>Date</th>
              <th>First User Word</th>
              <th>First AI Word</th>
              <th>Rounds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>No Action</td>
              <td>None</td>
              <td>None</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default GamesTable
