const Game = require('./game')
const Round = require('./round')
const Word = require('./word')

Game.hasMany(Round)
Round.belongsTo(Game)
Round.hasMany(Word)
Word.belongsTo(Round)

module.exports = {
  Game,
  Round,
  Word
}
