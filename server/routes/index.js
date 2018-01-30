const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

module.exports = function (app, shared) {
  app.use(morgan('dev'))
  app.use(express.static(path.join(__dirname, '../public/')))
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res, next) => {
    res.send('SUPER YESS')
  })
}
