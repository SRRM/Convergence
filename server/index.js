const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const w2v = require( 'word2vec' )


app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../static/')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.post('/input', (req, res, next) => {
    const dummyResponse = {
        humanWord: req.body.input,
        machineWord: 'Word'
    }
    res.json(dummyResponse)
})

app.post('/proof', function (req, res, next) {
  const computerWord = "water"
  const userInput = req.body.input

  const getModelAsync = () => new Promise((resolve, reject) => {
      w2v.loadModel( path.join(__dirname, '../trainingText/vectors.txt'), ( err, data ) => {
        if (err !== null) return reject(err);
        resolve(data);
      });
    });
  getModelAsync().then(model => {
  let vector1, vector2, vector3, vector4, midpointVector, nearestWord
  vector1 = model.getVector( computerWord)
    vector2 = model.getVector( userInput)
    vector3 = model.getVector( 'animal')
    vector4 = model.getVector( 'food')
    midpointVector = vector1.add(vector2).add(vector3).add(vector4)
    nearestWord = model.getNearestWords(midpointVector, 20)
    console.log(nearestWord)
    res.json(nearestWord)
    })

})

app.use(function (err, req, res, next) {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

const port = process.env.PORT || 3000 // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock")
  console.log("Who's there?")
  console.log(`Your server, listening on port ${port}`)
})