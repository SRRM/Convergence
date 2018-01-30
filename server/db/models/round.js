
const Sequelize = require('sequelize')
const db = require('../db')

const Round = db.define('round', {
  roundNum: {
    type: Sequelize.INTEGER,
  },
  userGuess: {
    type: Sequelize.STRING
  },
  userWords: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  machineOneGuess: {
    type: Sequelize.STRING
  },
  machineOneWords: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  machineTwoGuess: {
    type: Sequelize.STRING
  },
  machineTwoWords: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  cosineDist: {
    type: Sequelize.DECIMAL
  },
  //shared words: don't need to be stored in the db - do we want a virtual
})

module.exports = Round

