const router = require('express').Router()
const {Foods} = require('../db/models')

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

router.post('/',  async (req, res, next) => {
  try {
    const newFood = await Foods.create(req.body)
    res.json(newFood)
  }
  catch (err){
    next(err)
  }
})


module.exports = router
