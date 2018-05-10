const router = require('express').Router()


router.use('/users', require('./users'))
router.use('/foods', require('./foods'))
router.use('/foodLog', require('./foodLog'))
router.use('/images', require('./images'))
router.use('/nutri', require('./nutritionix'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
module.exports = router
