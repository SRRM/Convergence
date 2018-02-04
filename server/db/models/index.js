const Game = require('./game')
const Round = require('./round')
const Word = require('./word')

Game.hasMany(Round)
Round.belongsTo(Game)
Game.hasMany(Word)
Round.hasMany(Word)

module.exports = {
  Game,
  Round,
  Word
}
