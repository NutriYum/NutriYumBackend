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
      'x-app-id': '84bf4d6d', //'d5418b85', //this is a backup if usage limit is exceded
      'x-app-key': '95e4012de24b300a03fe49e96e9b5bbe' //'8539c58f9831675becfed9809c81137b'
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
        carbs: data.foods[0].nf_total_carbohydrate
      }
      res.json(foodFacts)
    })
    .catch(err => {
      if (err.statusCode === 404) {
        console.log(err)
        res.json('That item was not found! Try again')
      } else {
        console.log(err)
        res.json('Something broke! Try again')
      }
    })
})

router.get('/search/:manual', function(req, res, next) {
  const manual = req.params.manual
  const options = {
    method: 'POST',
    uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': '84bf4d6d', //'d5418b85', //this is a backup if usage limit is exceded
      'x-app-key': '95e4012de24b300a03fe49e96e9b5bbe' //'8539c58f9831675becfed9809c81137b'
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
          carbs: foodItems.nf_total_carbohydrate
        }
      })
      res.json(foodArr)
    })
    .catch(err => {
      if (err.statusCode === 404) {
        console.log(err)
        res.json('That item was not found! Try again')
      } else {
        console.log(err)
        res.json('Something broke! Try again')
      }
    })
})

module.exports = router
