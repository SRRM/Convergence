const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  randId: {
    type: Sequelize.STRING,
    unique: true,
    set() {
      let val = Math.random().toString(36).slice(6)
      this.setDataValue('randId', val)
    }
  },
  personality: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('Converged', 'Failed', 'Aborted')
  },
})

module.exports = Game
