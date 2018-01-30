const router = require('express').Router()
const { Game, Round } = require('../../db/models')
const commonWords = require('../../commonWords')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    let computerWord = commonWords[Math.floor(Math.random() * commonWords.length)]
    res.json({ computerWord })
  }
  catch (error) {
    next(error)
  }
})

router.post('/start', async (req, res, next) => {
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

router.post('/:gameId', async (req, res, next) => {
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

router.put('/:gameId', async (req, res, next) => {
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
