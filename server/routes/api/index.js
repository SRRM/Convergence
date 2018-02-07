
// module.exports = router
const reload = require('require-reload')(require)

module.exports = function (app, shared) {

  console.log('api index visited')

  reload('./games')(app, shared)
  reload('./play')(app, shared)
  reload('./words')(app, shared)

  // router.use('/play', require('./play')(shared))
  // router.use('/games', require('./games')(shared))
  app.use('/api', (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
  })

}
