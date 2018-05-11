const express = require('express')
const router = express.Router()
const requestPromise = require('request-promise')

router.get('/:foodName', function(req, res, next) {
  const foodName = req.params.foodName
  const options = {
    method: 'POST',
    uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': 'd5418b85', //'84bf4d6d', //this is a backup if usage limit is exceded
      'x-app-key': '8539c58f9831675becfed9809c81137b'//,'95e4012de24b300a03fe49e96e9b5bbe' 
    },
    body: {
      query: `${foodName}`
    },
    json: true
  }
  requestPromise(options)
    .then(data => {
      const foodFacts = {
        name: data.foods[0].food_name,
        sugar: data.foods[0].nf_sugars,
        calories: data.foods[0].nf_calories,
        totalFat: data.foods[0].nf_total_fat,
        sodium: data.foods[0].nf_sodium,
        protein: data.foods[0].nf_protein,
        carbs: data.foods[0].nf_total_carbohydrate,
        servingUnit: data.foods[0].serving_unit,
        quantity: data.foods[0].serving_qty
      }
      res.json(foodFacts)
    })
    .catch(err => {
      console.log(err.body)
      res.send('Item was not found! Try again')
    })
})

router.get('/search/:manual', function(req, res, next) {
  const manual = req.params.manual
  const options = {
    method: 'POST',
    uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': 'd5418b85', //'84bf4d6d', //this is a backup if usage limit is exceded
      'x-app-key': '8539c58f9831675becfed9809c81137b'//,'95e4012de24b300a03fe49e96e9b5bbe' 
    },
    body: {
      query: `${manual}`
    },
    json: true
  }
  requestPromise(options)
    .then(data => {
      let foodArr = data.foods.map(foodItems => {
        return {
          name: foodItems.food_name,
          sugar: foodItems.nf_sugars,
          calories: foodItems.nf_calories,
          totalFat: foodItems.nf_total_fat,
          sodium: foodItems.nf_sodium,
          protein: foodItems.nf_protein,
          carbs: foodItems.nf_total_carbohydrate,
          servingUnit: foodItems.serving_unit,
          quantity: foodItems.serving_qty
        }
      })
      res.json(foodArr)
    })
    .catch(err => {
      console.log(err.body)
      res.send('Item was not found! Try again')
    })
})

module.exports = router
