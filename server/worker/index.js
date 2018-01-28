const express = require('express')
const reload = require('require-reload')(require)
// const w2v = require('word2vec')


let app = express()

module.exports = {
  start: (shared) => {
    return new Promise((resolve, reject) => {
      try {

        app.use('/', reload('../index'))
        // app = express()
        // app.get('/', (req, res, next) => {
        //   res.json(shared)
        // })

        // app.use('/vecroute', reload('./vecroute'))

        // app.get('/spiderbank', (req, res, next) => {
        //   res.json(['woah', shared])
        // })

        // server = app.listen(3000, () => {
        //   console.log('listening on localhost:3000...')
        //   resolve()
        // })
      }
      catch (error) {
        reject(error)
      }
    })

  },

  teardown: () => {
    return new Promise((resolve, reject) => {
      try {
        if (server) {
          server.close(() => {
            resolve()
          })
        }
        else {
          resolve()
        }
      }
      catch (error) {
        reject(error)
      }
    })
  }
}

