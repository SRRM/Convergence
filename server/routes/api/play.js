// const router = require('express').Router()
const { Game, Round } = require('../../db/models')
const commonWords = require('../../commonWords')

const getVersions = require('../../getVersions')

// const pluralVersions = word => [pl.singular(word), pl.plural(word)]
// const pluralArray = arr => [...arr.map(word => pl.singular(word)), ...arr.map(word => pl.plural(word))]
// const casedArray = wordArray => [...wordArray.map(word => word[0].toLowerCase() + word.slice(1)), ...wordArray.map(word => word[0].toUpperCase() + word.slice(1))]


const pl = require('pluralize')




// module.exports = router

module.exports = function (router, shared) {

  function maybeValues(vector) {
    // avoids type errors

    if (vector.values) {
      return vector.values
    } else if (Array.isArray(vector)) {
      return vector
    } else {
      return new Array(+shared.size).fill(0)
    }
  }

  function vectorAddition(vectorOne, vectorTwo) {
    // returns vector only as an array of values

    let v1 = maybeValues(vectorOne)
    let v2 = maybeValues(vectorTwo)

    return v1.map((x, i) => x + v2[i])
  }

  function addVectors(...vectors) {
    console.log(vectors)
    if (vectors.length === 2) {
      return vectorAddition(vectors[0], vectors[1])
    } else if (vectors.length > 2) {
      return addVectors(vectorAddition(vectors[0], vectors[1]), ...vectors.slice(2))
    } else if (vectors.length === 1) {
      return vectors[0]
    } else {
      return new Array(+shared.size).fill(0)
    }
  }

  function scalarMult(vector, scalar) {
    return maybeValues(vector).map(x => x * scalar)
  }

  function magnitude(vector) {
    return Math.sqrt(maybeValues(vector).map(x => x * x).reduce((a, b) => a + b))
  }

  function unit(vec) {
    let vector = maybeValues(vec)
    const mag = magnitude(vector)
    if (mag === 0) {
      return vector
    }
    return vector.map(x => x / mag)
  }

  function personalityArray(personality) {
    return personality.match(/\w+/g).map(x => shared.getVector(x))
  }

  function aggregateStrategy(personality) {
    return unit(addVectors(...personality))
  }

  function getDistance(vectorOne, vectorTwo) {
    return 1 - (1 + shared.similarity(vectorOne, vectorTwo)) / 2
  }

  function isNear(personalityElement, userVector, computerVector) {
    let userDistance = getDistance(personalityElement, userVector)
    let computerDistance = getDistance(personalityElement, computerVector)
    return userDistance < 0.3 || computerDistance < 0.3
  }

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

      // personality = personalityArray(personality)

      // console.log(addVectors([0, 1, 0], [0, 1, 0], [0, 1, 0]))

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

      let netVector = addVectors(scalarMult(machineVector, 0.6), scalarMult(userVector, 0.4))

      let cloud = await shared.getNearestWords(netVector, 20) // [{word: '', dist: number}]

      // let cloud = await shared.mostSimilar(`${personality} ${userWord} ${computerWord}`, 10) //[{word: '', dist: number}]

      let machineFirstGuess = cloud.filter(x => pluralInputs.indexOf(x.word.toLowerCase()) === -1)[0].word.toLowerCase()

      // =======

      //       let cloud = shared.mostSimilar(`${personality} ${userWord} ${userWord} ${computerWord}`, 20) //[{word: '', dist: number}]

      //       let machineFirstGuess = cloud.filter(x => [userWord, computerWord].indexOf(x.word) === -1)[0].word

      // >>>>>>> master
      let cosineDistance = getDistance(userWord, computerWord)

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

      const cosineDistance = getDistance(userWord, computerWord)

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
      computerWord = computerWord.toLowerCase()


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

      // isPrimed tells us whether a given word in the personality has been primed

      const isPrimed = personalityWord => isNear(personalityWord, userWord, computerWord)

      let personality = personalityArray(game.personality)

      // we will be using the priming strategy instead of the aggregate strategy.

      personality = personality.filter(elem => isPrimed(elem.word))

      // although we are actually using an aggregate of the primed personality words
      // so a combination of the two strategies
      // (but mostly the priming strategy)
      // (this should also make personality a zero vector if nothing is primed)
      // so we will end up with either a zero vector
      // or a unit vector in aggregate direction of primed personality words

      personality = unit(addVectors(...personality))

      const rounds = await Round.findAll({ where: { gameId: game.id } })

      const userHistory = rounds.map(x => x.userWord)

      const computerHistory = rounds.map(x => x.machineOneWord)

      // const casings = casedArray(pluralArray([computerWord, userWord, ...userHistory, ...computerHistory]))

      const pluralInputs = [...getVersions(computerWord), ...getVersions(userWord), ...userHistory, ...computerHistory]

      const cosineDistance = getDistance(userWord, computerWord)

      let userVector = await shared.getVector(userWord)

      let computerVector = await shared.getVector(computerWord)

      // <<<<<<< apiAi

      let netVector = addVectors(scalarMult(computerVector, 0.4), scalarMult(userVector, 0.6))

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
