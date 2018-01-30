const Game = require('./game')
const Round = require('./round')

Game.hasMany(Round)
Round.belongsTo(Game)

module.exports = {
  Game,
  Round
}
