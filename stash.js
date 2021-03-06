const commonWords = require('./commonWords')

  app.get('*', function (req, res, next) {
    gameHistory = {
      userHistory: [],
      computerHistory: [],
    }
    res.sendFile(path.join(__dirname, '../public'))
  })
  app.post('/input', (req, res, next) => {
    const dummyResponse = {
      humanWord: req.query.input,
      machineWord: 'Word'
    }
    res.json(dummyResponse)
  })

  app.post('/proof', function (req, res, next) {
    let wordCloud
    let computerWord

    console.log('user history:', gameHistory.userHistory)
    console.log('ai history:', gameHistory.computerHistory)




    let userHistCloud
    let compHistCloud

    const cloudToString = cloud => cloud.map(x => x.word).join(' ')

    let compString
    let userString

    if (gameHistory.userHistory.length) {
      userHistCloud = model.mostSimilar(gameHistory.userHistory[0], 10)
      compHistCloud = model.mostSimilar(gameHistory.computerHistory[0], 10)
      compString = cloudToString(compHistCloud)
      userString = cloudToString(compHistCloud)
      wordCloud = model.mostSimilar(`${gameHistory.userHistory[0]} ${gameHistory.computerHistory[0]}`, 10)
      // console.log(wordCloud)
      computerWord = wordCloud.filter(x => [...gameHistory.userHistory, ...gameHistory.computerHistory].indexOf(x.word) === -1)[0].word
    } else {
      computerWord = commonWords[Math.floor(Math.random()*commonWords.length)]
    }
    let ourRes
    // try {
    //   let ourRes = getSynonyms(req.query.input);
    //   let theRes = await ourRes
    //   let syns = theRes.data.synonyms
    //   console.log(syns)
    // } catch (err) {
    //   console.error(err)
    // }

    // console.log(await getSynonyms(req.query.input))

    gameHistory.userHistory.unshift(req.query.input)
    gameHistory.computerHistory.unshift(computerWord)

    const userInput = req.query.input

    let userCloud = model.mostSimilar(userInput, 10)
    let computerCloud = model.mostSimilar(computerWord, 10)

    console.log('computer word:', computerWord)
    console.log('user input:', userInput)
    // console.log(nearestWord)
    res.json({ computerWord, userInput, userCloud, computerCloud })

  })

  app.use(function (err, req, res, next) {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  // const port = process.env.PORT || 3000 // this can be very useful if you deploy to Heroku!
  // app.listen(port, function () {
  //   console.log("Knock, knock")
  //   console.log("Who's there?")
  //   console.log(`Your server, listening on port ${port}`)
  // })

// const wixFetch = reload('wix-fetch').fetch
// const model = reload('./worker/vecroute')

// const mod = reload('./worker/vecroute.js')

// const getModel = () => new Promise((resolve, reject) => {
//   w2v.loadModel(path.join(__dirname, '../trainingText/vectors.txt'), (err, data) => {
//     if (err !== null) return reject(err);
//     resolve(data);
//   });
// })


// let model

// const getModelAsync = async () => {
//   model = await getModel()
// }
// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
// app.get('*', function (req, res, next) {
//   res.sendFile(path.join(__dirname, '../public/'))
// })



// getModelAsync()
// let app = express.router()

async function asyncApp() {

  // const getSynonyms = word => app.fetch(`https://wordsapiv1.p.mashape.com/words/example${word}/`, { method: 'get' })
  //   return axios({
  //     method: 'get',
  //     url: ourUrl,
  //     responseType: 'json'
  //   })
  //     .then(x => {
  //       resolve(x.data.synonyms)
  //     })
  //     .catch(reject)
  // })

  // fetch()


  const getModel = () => new Promise((resolve, reject) => {
    w2v.loadModel(path.join(__dirname, '../trainingText/vectors.txt'), (err, data) => {
      if (err !== null) return reject(err);
      resolve(data);
    });
  });

  // let model = await getModel()
  let model = {}

  // const getModelAsync = async () => {
  //   model = await getModel()
  // }

  // getModelAsync()

  // const model = await getModel()

  let gameHistory = {
    userHistory: [],
    computerHistory: [],
  }


  // const model = await getModelAsync()

  // Any routes or other various middlewares should go here!

  // Make sure this is right at the end of your server logic!
  // The only thing after this might be a piece of middleware to serve up 500 errors for server problems
  // (However, if you have middleware to serve up 404s, that go would before this as well)
}
