const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise')
// const {foodName} = './watsonStuff'

router.get('/:foodName', function(req, res, next) {

    const foodName = req.params.foodName;
    const options =
    {
        // uri: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
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

module.exports = router
