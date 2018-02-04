
const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
  word: {
    type: Sequelize.STRING
  },
  agent: {
    type: Sequelize.ENUM('user', 'machine')
  }
})

module.exports = Word
