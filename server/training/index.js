// const battleBots = tvShow

// const manswers = tv.tvShow

// const spike = battlebots.on(channel)

// battleBots.commercial = slimjims

// slimjims.goesGreatWith = energyDrink('monster')

// const rl = require('readline')

const commonWords = require('../commonWords')

async function playMachineGame() {

  const model = await require('../shared/vecroute.js')

  console.log('model loaded!')



  class Game {

    constructor(machineOne, machineTwo) {
      this.machineOne = machineOne
      this.machineTwo = machineTwo
      this.rounds = []
      this.done = false
      this.playRound = this.playRound.bind(this)
      this.firstRound = this.firstRound.bind(this)
      this.playGame = this.playGame.bind(this)
    }

    firstRound() {
      const machineOneWord = commonWords[Math.floor(Math.random() * commonWords.length)]
      const machineTwoWord = commonWords[Math.floor(Math.random() * commonWords.length)]
      this.rounds.unshift(new Round(machineOneWord, machineTwoWord))
    }

    playRound() {

      let machineOneVector = this.machineOne.getVector(this.rounds[0].wordOne).values
      let machineTwoVector = this.machineTwo.getVector(this.rounds[0].wordTwo).values

      let machineOneCloud = this.machineOne.getNearestWords(vectorAddition(scalarMult(machineOneVector, 0.6), scalarMult(machineTwoVector, 0.4)))

      let machineTwoCloud = this.machineTwo.getNearestWords(vectorAddition(scalarMult(machineTwoVector, 0.6), scalarMult(machineOneVector, 0.4)))

      // let machineOneCloud = this.machineOne.add(`${this.rounds[0].wordOne} ${this.rounds[0].wordOne} ${this.rounds[0].wordTwo}`, 10)
      // let machineTwoCloud = this.machineTwo.mostSimilar(`${this.rounds[0].wordTwo} ${this.rounds[0].wordTwo} ${this.rounds[0].wordOne}`, 10)

      let machineOneHist = this.rounds.map(x => x.wordOne)
      let machineTwoHist = this.rounds.map(x => x.wordTwo)

      let wordOne = machineOneCloud.filter(x => [...machineOneHist, ...machineTwoHist].indexOf(x.word) === -1)[0].word

      let wordTwo = machineTwoCloud.filter(x => [...machineOneHist, ...machineTwoHist].indexOf(x.word) === -1)[0].word

      this.rounds.unshift(new Round(wordOne, wordTwo))

      if (wordOne === wordTwo) {
        this.done = true
        console.log('\n\nYOU WIN!\n\n')
      }
      if (this.rounds.length >= 20) {
        this.done = true
      }

    }

    playGame() {
      this.firstRound()
      console.log(this.rounds[0])
      while (!this.done) {
        this.playRound()
        console.log(this.rounds[0])
      }
    }

  }

  function scalarMult(vector, scalar) {
    return maybeValues(vector).map(x => x * scalar)
  }

  function maybeValues (vector) {
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

  class Round {
    constructor(wordOne, wordTwo) {
      this.wordOne = wordOne
      this.wordTwo = wordTwo
      this.distance = 1 - model.similarity(wordOne, wordTwo)
      console.log(wordOne, wordTwo)
    }
  }

  function machineGame(modelOne, modelTwo) {
    let game = new Game(modelOne, modelTwo)

    game.playGame()
    // game.playRound()
    // game.playRound()
    // game.playRound()
    // console.log(game.rounds)
  }

  // function playFunction() {

  //   machineGame(model, model)
  //   const interface = rl.createInterface({
  //     input: process.stdin,
  //     output: process.stdout
  //   })
  //   rl.question('Play again? (y/n)', (answer) => {
  //     if (answer)

  //   })
  //   console.log('Play again?')
  //   let query = readline()
  // }
  console.log(model.getNearestWord(scalarMult(model.getVector('spider'), -1)))

  // machineGame(model, model)

}

playMachineGame()
