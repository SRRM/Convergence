const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  randId: {
    type: Sequelize.STRING,
    defaultValue: function() {
      return Math.random().toString(36).slice(6)
    },
    unique: true
  },
  personality: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('Converged', 'Failed', 'Aborted')
  }
})


module.exports = Game

