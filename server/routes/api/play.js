// const router = require('express').Router()
const { Game, Round } = require('../../db/models')
const commonWords = require('../../commonWords')

// module.exports = router

module.exports = function (router, shared) {

  console.log('api play visited')

  // const router = require('express').Router()
  router.get('/api/play', async (req, res, next) => {
    try {
      let computerWord = commonWords[Math.floor(Math.random() * commonWords.length)]
      res.json({ computerWord })
    }
    catch (error) {
      next(error)
    }
  })

  router.post('/api/play/start', async (req, res, next) => {
    try {
      //!!!!!!!!!!!!!!!await machineFirstGuess, cosineDistance
      const game = await Game.create({
        personality: req.body.personality
      })
      const firstRound = await Round.create({
        cosineDistance: cosineDistance,
        gameId: game.randId,
        machineOneWord: req.body.computerWord,
        roundNum: 0,
        userWord: req.body.userWord,
      })
      res.json({
        game,
        firstRound,
        machineFirstGuess,
      })
    }
    catch (error) {
      next(error)
    }
  })

  router.post('/api/play/:gameId', async (req, res, next) => {
    try {
      //!!!!!!!!!!!!!!!! await machineOneWord, cosineDistance
      const newRound = await Round.create({
        cosineDistance: cosineDistance,
        gameId: req.params.gameId,
        machineOneWord: req.body.computerWord,
        roundNum: req.body.roundNum,
        userWord: req.body.userWord,
      })
      res.json(
        newRound,
        machineOneGuess,
      )
    }
    catch (error) {
      next(error)
    }
  })

  router.put('/api/play/:gameId', async (req, res, next) => {
    try {
      const game = await Game.update({
        where: {
          gameId: req.params.gameId
        },
        status: req.body.status
      })
      res.sendStatts(302)
    }
    catch (error) {
      next(error)
    }
  })
}
