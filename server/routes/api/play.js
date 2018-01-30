const router = require('express').Router()
const { Game, Round } = require('../../db/models')
module.exports = router

//router.get()


router.post('/', async (req, res, next) => {
  try {
    const game = await Game.create({
      personality: req.body.personality
    })
  }
  catch (error) {
    next(error)
  }
})
