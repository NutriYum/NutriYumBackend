const router = require('express').Router()
const {FoodLog} = require('../db/models')

router.param('foodLogId', async (req, res, next, foodId) => {
  try {
    const food = await FoodLog.findById(foodId);
    req.food = food;
    next();
  }
  catch (err) {
    next(err);
  }
})

router.get('/',  async (req, res, next) => {
  try {
    const allFoodLogs = await FoodLog.findAll()
    res.json(allFoodLogs)
  }
  catch (err){
    next(err)
  }
})

router.post('/',  async (req, res, next) => {
  try {
    const newFood = await FoodLog.create(req.body)
    res.json(newFood)
  }
  catch (err){
    next(err)
  }
})


module.exports = router
