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
    const newFoodArray = await req.body.map(element => {
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
    const newFood = await Promise.all(newFoodArray)
    // console.log(req.body[0])
    // FoodLogs.create({
    //     name: req.body[0].name,
    //     sugar: req.body[0].sugar,
    //     calories: req.body[0].calories,
    //     totalFat: req.body[0].totalFat,
    //     sodium: req.body[0].sodium,
    //     protein: req.body[0].protein,
    //     carbs: req.body[0].carbs,
    //     servingUnit: req.body[0].servingUnit,
    //     quantity: req.body[0].quantity,
    //     userId: req.user.id
    // })
    // .then(result => res.json(result))
    console.log(newFood)
    res.json(newFood)
  } catch (err) {
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
