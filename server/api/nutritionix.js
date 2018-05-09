const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise')

router.get('/:foodName', function(req, res, next) {

  const foodName = req.params.foodName;
  const options =
  {
      method: 'POST',
      uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'd5418b85',
        'x-app-key': 'ddc6228322dfe36efb7b3b24fb778763'
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
    }
    res.json(foodFacts)
  })
  .catch(next)
});


router.get('/search/:manual', function(req, res, next) {

  const manual = req.params.manual;
  const options =
  {
      method: 'POST',
      uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'd5418b85',
        'x-app-key': 'ddc6228322dfe36efb7b3b24fb778763'
      },
      body: {
      query: `${manual}`
      },
      json: true
  }
  requestPromise(options)
  .then(data => {
    let foodArr = data.foods.map(
      foodItems => {
      return (
        {
          name: foodItems.food_name,
          sugar: foodItems.nf_sugars,
          calories: foodItems.nf_calories,
          totalFat: foodItems.nf_total_fat,
          sodium: foodItems.nf_sodium,
          protein: foodItems.nf_protein,
          carbs: foodItems.nf_total_carbohydrate,
        }
      )
    }
  )
  res.json(foodArr)
  })
  .catch(next)
});



module.exports = router
