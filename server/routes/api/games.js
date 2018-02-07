
const Sequelize = require('sequelize')

module.exports = function (router, shared) {
  console.log('api games visited')
  const { Game, Round } = require('../../db/models')

  //get all completed games and total rounds each took
  router.get('/api/games/history/:pageNumber', async (req, res, next) => {
    try {
      let pageNum = req.params.pageNumber
      let offset = (pageNum - 1) * 10
      const games = await Game.findAll({
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: 10,
        include: [{
          model: Round,
        }]
      })
      const result = games.map( game =>
      ({
        randId: game.randId,
        createdAt: game.createdAt,
        userWord: game.rounds[game.rounds.length - 1].userWord,
        machineOneWord: game.rounds[game.rounds.length - 1].machineOneWord,
        roundCount: game.rounds.length - 1,
      }))
      res.json(result)
    }
    catch (error) {
      next(error)
    }
  })

  //get all data plus rounds for specified game
  router.get('/api/games/:id', async (req, res, next) => {
    try {
      const game = await Game.findOne({
        where: {
          randId: req.params.id
        },
        include: [{
          model: Round
        }]
      })
      res.json(game)
    }
    catch (error) {
      next(error)
    }
  })
}



// const games = await Game.findAll({
//   group: ['game.id'],
//   order: [['createdAt', 'DESC']],
//   limit: 15,
//   attributes: ['id', 'randId', [Sequelize.fn('COUNT', Sequelize.col('rounds.id')), 'totalRounds']],
//   include: [{
//     model: Round,
//     attributes: [],
//     duplicating: false
//   }]
// })
