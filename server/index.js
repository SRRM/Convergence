const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');

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
    //Rays code goes here
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