const router = require('express').Router()
module.exports = router

router.use('/play', require('./play'))
router.use('/games', require('./games'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
