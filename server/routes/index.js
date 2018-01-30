const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const commonWords = require('../commonWords')
const w2v = require('word2vec')

let gameHistory = {
  user: [],
  computer: []
}


module.exports = function (app, shared) {

  // let model = shared

  const cloudToString = cloud => cloud.map(x => x.word).join(' ')

  app.use(morgan('dev'))
  app.use(express.static(path.join(__dirname, '../../public/')))
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public'))
    // gameHistory.user = []
    // gameHistory.computer = []
  })

  app.post('/proof', (req, res, next) => {
    let userCloud, computerCloud, userWord, computerWord, newCloud, newWord


    userWord = req.body.input

    console.log('userHistory', gameHistory.user)
    console.log('computerHistory', gameHistory.computer)

    if (gameHistory.user.length) {
      // userCloud = model.mostSimilar(gameHistory.user[0], 10)
      // computerCloud = model.mostSimilar(gameHistory.computer[0], 10)
      newCloud = shared.mostSimilar(`${gameHistory.user[0]} ${gameHistory.computer[0]}`, 10)

      newWord = newCloud.filter(x => [...gameHistory.user, ...gameHistory.computer].indexOf(x) === -1)[0].word

    } else {
      newWord = commonWords[Math.floor(Math.random() * commonWords.length)]
    }

    gameHistory.user.unshift(userWord)
    gameHistory.computer.unshift(newWord)

    res.json({ newWord })

  })

  app.get('/', (req, res, next) => {
    res.send('SUPER YESS')
  })
}
