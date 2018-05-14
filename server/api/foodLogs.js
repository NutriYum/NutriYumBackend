const router = require('express').Router()
const {FoodLogs} = require('../db/models')

router.param('foodLogsId', async (req, res, next, foodId) => {
  try {
    const food = await FoodLogs.findById(foodId);
    req.food = food;
    next();
  }
  catch (err) {
    next(err);
  }
})

router.get('/',  async (req, res, next) => {
  try {
    const allFoodLogs = await FoodLogs.findAll()
    res.json(allFoodLogs)
  }
  catch (err){
    next(err)
  }
})

router.get('/:id',  async (req, res, next) => {
  try {
    const id = req.params.id
    const userFoodLogs = await FoodLogs.findAll({
      where: {
        userId: id
      }
    })
    res.json(userFoodLogs)
  }
  catch (err){
    next(err)
  }
})

router.post('/',  async (req, res, next) => {
  try {
    const newFood = await FoodLogs.create(req.body)
    res.json(newFood)
  }
  catch (err){
    next(err)
  }
})

router.get('/:id/day', (req, res, next) => {
  let userId = req.params.id
  FoodLogs.oneDay(userId)
  .then((dayOfFoodLogs) => res.status(200).json(dayOfFoodLogs))
  .catch(next);
})

router.get('/:id/week', (req, res, next) => {
  let userId = req.params.id
  FoodLogs.oneWeek(userId)
  .then((dayOfFoodLogs) => res.status(200).json(dayOfFoodLogs))
  .catch(next);
})

router.get('/:id/month', (req, res, next) => {
  let userId = req.params.id
  FoodLogs.oneMonth(userId)
  .then((dayOfFoodLogs) => res.status(200).json(dayOfFoodLogs))
  .catch(next);
})

module.exports = router
