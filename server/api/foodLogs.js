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

///// ALL USERS DATA //////

router.get('/day', (req, res, next) => {
FoodLogs.oneDayAll()
.then((dayOfFoodLogs) => res.status(200).json(dayOfFoodLogs))
.catch(next);
})

router.get('/week', (req, res, next) => {
FoodLogs.oneWeekAll()
.then((dayOfFoodLogs) => res.status(200).json(dayOfFoodLogs))
.catch(next);
})

router.get('/month', (req, res, next) => {
FoodLogs.oneMonthAll()
.then((dayOfFoodLogs) => res.status(200).json(dayOfFoodLogs))
.catch(next);
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
  console.log(req)
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
router.get('/:id/day', (req, res, next) => {
  let userId = req.params.id
  FoodLogs.oneDay(userId)
  .then((dayOfFoodLogs) => res.status(200).json(dayOfFoodLogs))
  .catch(next);
})





module.exports = router
