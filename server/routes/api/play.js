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
      //  req.body: { personality = '', userWord, computerWord }
      const {personality, userWord, computerWord} = req.body

      console.log('personality: ', personality)
      console.log('userWord: ', userWord)
      console.log('computerWord: ', computerWord)

      console.log('shared in play api: ', shared)

      let cloud = await shared.mostSimilar(`${personality} ${userWord} ${computerWord}`, 10) //[{word: '', dist: number}]

      let machineFirstGuess = cloud.filter(x => [userWord, computerWord].indexOf(x.word) === -1)[0].word

      let cosineDistance = 1 - shared.similarity(userWord, computerWord)

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
        cosineDistance
      })
    }
    catch (error) {
      next(error)
    }
  })

  router.post('/api/play/:gameId', async (req, res, next) => {
    try {

      const { userWord, computerWord } = req.body

      const game = await Game.findOne({
        where: { randId: req.params.gameId },
        inlude: [{model: round}]
      })

      const rounds = Round.findAll({ where: { gameId: game.randId } })

      const userHistory = rounds.map(x => x.userWord)
      const computerHistory = rounds.map(x => x.machineOneWord)

      const personality = game.personality

      const cosineDistance = 1 - shared.similarity(userWord, computerWord)

      let cloud = shared.mostSimilar(`${personality} ${userWord} ${computerWord}`, 20)

      let machineOneGuess = cloud.filter(x => [userWord, computerWord, ...userHistory, ...computerHistory].indexOf(x.word) === -1)[0].word

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
        cosineDistance
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
      res.sendStatus(302)
    }
    catch (error) {
      next(error)
    }
  })
}
