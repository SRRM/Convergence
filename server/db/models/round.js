
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
    type: Sequelize.FLOAT
  },
  commonWords: {
    type: Sequelize.VIRTUAL,
    get() {
      let commonArray;
      if (this.userGuess){
        commonArray = this.userWords.filter((word) => this.machineOneWords.includes(word))
      } else {
        commonArray = this.machineOneWords.filter((word) => this.machineTwoWords.includes(word))
      }
      return [...new Set(commonArray)].join(' ')
    }
  }
})

module.exports = Round

