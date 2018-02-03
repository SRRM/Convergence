// const router = require('express').Router()
const { Game, Round } = require('../../db/models')
const commonWords = require('../../commonWords')

function maybeValues(vector) {
  // avoids type errors

  if (vector.values) {
    return vector.values
  } else if (Array.isArray(vector)) {
    return vector
  } else {
    return new Array(300).fill(0)
  }
}

function vectorAddition(vectorOne, vectorTwo) {
  // returns vector only as an array of values

  let v1 = maybeValues(vectorOne)
  let v2 = maybeValues(vectorTwo)

  return v1.map((x, i) => x + v2[i])
}

function scalarMult(vector, scalar) {
  return maybeValues(vector).map(x => x * scalar)
}

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
      const { personality, userWord, computerWord } = req.body

      // console.log('personality: ', personality)
      // console.log('userWord: ', userWord)
      // console.log('computerWord: ', computerWord)

      // console.log('shared in play api: ', shared)

      let machineVector = await shared.getVector(computerWord)

      let userVector = await shared.getVector(userWord)

      let netVector = vectorAddition(scalarMult(machineVector, 0.6), scalarMult(userVector, 0.4))

      let cloud = await shared.getNearestWords(netVector, 20) // [{word: '', dist: number}]

      // let cloud = await shared.mostSimilar(`${personality} ${userWord} ${computerWord}`, 10) //[{word: '', dist: number}]

      let machineFirstGuess = cloud.filter(x => [userWord, computerWord].indexOf(x.word) === -1)[0].word

      // =======

      //       let cloud = shared.mostSimilar(`${personality} ${userWord} ${userWord} ${computerWord}`, 20) //[{word: '', dist: number}]

      //       let machineFirstGuess = cloud.filter(x => [userWord, computerWord].indexOf(x.word) === -1)[0].word

      // >>>>>>> master
      let cosineDistance = 1 - shared.similarity(userWord, computerWord)

      //!!!!!!!!!!!!!!!await machineFirstGuess, cosineDistance
      const game = await Game.create({
        personality: req.body.personality
      })
      // console.log(req.body)
      const firstRound = await Round.create({
        cosineDistance: cosineDistance,
        gameId: game.id,
        machineOneWord: req.body.computerWord,
        roundNum: 0,
        userWord: req.body.userWord,
      })

      console.log('fake json: ', {
        game,
        firstRound,
        machineFirstGuess,
        cosineDistance
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

      console.log('req.body: ', req.body)

      const game = await Game.findOne({
        // <<<<<<< apiAi
        //         where: { randId: req.params.gameId },
        //         inlude: [{ model: round }]
        // =======
        where: { id: req.params.gameId },
        inlude: [{ all: true }]
        // >>>>>>> master
      })

      const rounds = await Round.findAll({ where: { gameId: game.id } })

      const userHistory = rounds.map(x => x.userWord)

      const computerHistory = rounds.map(x => x.machineOneWord)

      const personality = game.personality

      const cosineDistance = 1 - (1 + shared.similarity(userWord, computerWord)) / 2

      let userVector = await shared.getVector(userWord)

      let computerVector = await shared.getVector(computerWord)

      // <<<<<<< apiAi

      let netVector = vectorAddition(scalarMult(computerVector, 0.6), scalarMult(userVector, 0.4))

      let cloud = await shared.getNearestWords(netVector, 20)
      // =======

      //       let cloud = await shared.mostSimilar(`${personality} ${userWord} ${computerWord}`, 20)
      // >>>>>>> master

      let machineOneGuess = cloud.filter(x => [userWord, computerWord, ...userHistory, ...computerHistory].indexOf(x.word) === -1)[0].word

      /*

      possible with pluralize:

      let guessObject = {
        mainGuess: "dog",
        allForms: ["dog", "dogs"]
      }

      need this for verbs

      let guessObject = {
        mainGuess: "created"
        allForms: ["created", "creates", "create", "creating"]
      }

      possibly acceptable:

      let guessObject = {
        mainGuess: "dog",
        allForms: ["dog", "dogs", "dogged", "dogging"]
      }

      let guessObject = {
        mainGuess: "eat",
        allForms: ["eat", "eats", "ate", "eating", "eaten"]
      }



      */

      //!!!!!!!!!!!!!!!! await machineOneWord, cosineDistance
      const newRound = await Round.create({
        cosineDistance: cosineDistance,
        gameId: req.params.gameId,
        machineOneWord: req.body.computerWord,
        roundNum: req.body.roundNum,
        userWord: req.body.userWord,
      })
      res.json({
        newRound,
        machineOneGuess,
        cosineDistance
      })
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
