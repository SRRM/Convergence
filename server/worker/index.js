const express = require('express')
const path = require('path')
const reload = require('require-reload')(require)
const w2v = require('word2vec')
const routes = reload('../routes')
const db = require('../db')
let server
let app

module.exports = {
  start: (shared) => {
    return new Promise((resolve, reject) => {
      try {
        console.log(shared)
        app = express()
        routes(app, shared)

        db.sync({force: true})
          .then(() => {
            console.log('db synced')
            server = app.listen(3000, () => {
              console.log('listening on localhost:3000...')
              resolve()
            })
          }).catch((error) => {
            console.log(error)
            reject(error)
          })

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

