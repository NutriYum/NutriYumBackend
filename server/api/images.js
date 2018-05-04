const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/',  async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  }
  catch (err){
    next(err)
  }
})
