const router = require('express').Router()
const { FoodLogs } = require('../db/models')

router.param('foodLogsId', async (req, res, next, foodId) => {
  try {
    const food = await FoodLogs.findById(foodId)
    req.food = food
    next()
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allFoodLogs = await FoodLogs.findAll()
    res.json(allFoodLogs)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const userFoodLogs = await FoodLogs.findAll({
      where: {
        userId: id
      }
    })
    res.json(userFoodLogs)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // name: 'bagel',
  // sugar: 8.85,
  // calories: 277.2,
  // totalFat: 1.39,
  // sodium: 443.1,
  // protein: 11.09,
  // carbs: 55,
  // servingUnit: 'medium bagel',
  // quantity: 1
  try {
    const newFood = await req.body.forEach(element => {
      return FoodLogs.create({
        name: element.name,
        sugar: element.sugar,
        calories: element.calories,
        totalFat: element.totalFat,
        sodium: element.sodium,
        protein: element.protein,
        carbs: element.carbs,
        servingUnit: element.servingUnit,
        quantity: element.quantity,
        userId: req.user.id
      })
    })

    res.json(newFood)
  } catch (err) {
    next(err)
  }
})

module.exports = router
