const express = require('express')
const path = require('path')
const reload = require('require-reload')(require)
const routes = reload('../routes')
let server
let app

module.exports = {
  start: (shared) => {
    return new Promise((resolve, reject) => {
      try {
        app = express()
        routes(app, shared)

        server = app.listen(3000, () => {
          console.log('listening on localhost:3000...')
          resolve()
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

