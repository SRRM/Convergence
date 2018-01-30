

// module.exports = router

module.exports = function (router, shared) {
  console.log('api games visited')
  const { Game, Round } = require('../../db/models')
  // const router = require('express').Router()
  //get all completed games and total rounds each took
  router.get('/api/games', async (req, res, next) => {
    try {
      const games = await Game.findAll({
        // where: {
        //   status: {
        //     $or: [{status: 'Converged'}, {status: 'Failed'}]
        //   }
        // },
        attributes: {
          include: [[Sequelize.fn("COUNT", Sequelize.col("rounds.id")), "totalRounds"]]
        },
        include: [{
          model: Round, attributes: []
        }],
        group: ['Game.id']
      })
      res.json(games)
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
