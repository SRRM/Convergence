const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  personality: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('Converged', 'Failed', 'Aborted')
  }
})

module.exports = Game
