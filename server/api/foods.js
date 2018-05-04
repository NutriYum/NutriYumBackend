const router = require('express').Router()
const {Foods} = require('../db/models')
module.exports = router

router.param('foodId', async (req, res, next, foodId) => {
  try {
    const food = await Foods.findById(foodId);
    req.food = food;
    next();
  }
  catch (err) {
    next(err);
  }
})

router.get('/',  async (req, res, next) => {
  try {
    const allfoods = await Foods.findAll()
    res.json(allfoods)
  }
  catch (err){
    next(err)
  }
})
