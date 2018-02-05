// const router = require('express').Router()
const { Game, Round, Word } = require('../../db/models')
const commonWords = require('../../commonWords')

const getVersions = require('../../getVersions')

// const pluralVersions = word => [pl.singular(word), pl.plural(word)]
// const pluralArray = arr => [...arr.map(word => pl.singular(word)), ...arr.map(word => pl.plural(word))]
// const casedArray = wordArray => [...wordArray.map(word => word[0].toLowerCase() + word.slice(1)), ...wordArray.map(word => word[0].toUpperCase() + word.slice(1))]


const pl = require('pluralize')

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
      let { personality, userWord, computerWord } = req.body

      userWord = userWord.toLowerCase()

      const pluralInputs = [...getVersions(userWord), ...getVersions(computerWord)]
      // const casings = casedArray(pluralInputs)

      // console.log('personality: ', personality)
      // console.log('userWord: ', userWord)
      // console.log('computerWord: ', computerWord)

      // console.log('shared in play api: ', shared)

      console.time('computerWord')

      let machineVector = await shared.getVector(computerWord)

      console.timeEnd('computerWord')
      console.log('got computerWord!')

      let userVector = await shared.getVector(userWord)

      let netVector = vectorAddition(scalarMult(machineVector, 0.6), scalarMult(userVector, 0.4))

      let cloud = await shared.getNearestWords(netVector, 20) // [{word: '', dist: number}]

      // let cloud = await shared.mostSimilar(`${personality} ${userWord} ${computerWord}`, 10) //[{word: '', dist: number}]

      let machineFirstGuess = cloud.filter(x => pluralInputs.indexOf(x.word.toLowerCase()) === -1)[0].word.toLowerCase()

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

      // console.log('fake json: ', {
      //   game,
      //   firstRound,
      //   machineFirstGuess,
      //   cosineDistance
      // })

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

  router.post('/api/play/:gameId/win', async (req, res, next) => {
    try {
      const updatedGame = await Game.update(
        { status: 'Converged' },
        { where: { id: req.params.gameId }, returning: true, plain: true }
      )

      const game = updatedGame[1]

      console.log(game)

      // const game = updatedGame[1][0]

      const newRound = await Round.create({
        cosineDistance: 0,
        gameId: req.params.gameId,
        machineOneWord: req.body.userWord,
        roundNum: req.body.roundNum,
        userWord: req.body.userWord,
      })

      res.json({
        game,
        newRound
      })

    } catch (error) {
      next(error)
    }
  })

  router.post('/api/play/:gameId/lose', async (req, res, next) => {
    try {

      const { userWord, computerWord } = req.body

      const updatedGame = await Game.update({
        status: 'Failed'
      },
        {
          where: {
            id: req.params.gameId
          }
        })



      const game = updatedGame[1][0]

      let cosineDistance = 1 - shared.similarity(userWord, computerWord)

      const newRound = await Round.create({
        cosineDistance: cosineDistance,
        gameId: req.params.gameId,
        machineOneWord: req.body.computerWord,
        roundNum: req.body.roundNum,
        userWord: req.body.userWord,
      })



      res.json({
        game,
        newRound
      })

    } catch (error) {
      next(error)
    }
  })

  router.post('/api/play/:gameId', async (req, res, next) => {
    try {

      let { userWord, computerWord } = req.body

      userWord = userWord.toLowerCase()


      // const pluralInputs = [...pluralVersions(userWord), ...pluralVersions(computerWord)]

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

      // const casings = casedArray(pluralArray([computerWord, userWord, ...userHistory, ...computerHistory]))

      const pluralInputs = [...getVersions(computerWord), ...getVersions(userWord), ...userHistory, ...computerHistory]

      const personality = game.personality

      const cosineDistance = 1 - (1 + shared.similarity(userWord, computerWord)) / 2

      let userVector = await shared.getVector(userWord)

      let computerVector = await shared.getVector(computerWord)

      // <<<<<<< apiAi

      let netVector = vectorAddition(scalarMult(computerVector, 0.4), scalarMult(userVector, 0.6))

      let cloud = await shared.getNearestWords(netVector, 20)
      // =======

      //       let cloud = await shared.mostSimilar(`${personality} ${userWord} ${computerWord}`, 20)
      // >>>>>>> master

      let machineOneGuess = cloud.filter(x => pluralInputs.indexOf(x.word) === -1)[0].word

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
      await Word.create({
        word: userWord,
        agent: 'user',
        roundId: newRound.id
      })
      await Word.create({
        word: computerWord,
        agent: 'machine',
        roundId: newRound.id
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
