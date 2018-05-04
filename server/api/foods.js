const router = require('express').Router()
const {Foods} = require('../db/models')
const requestPromise = require('request-promise')
// const {foodName} = './watsonStuff'

router.get('/foods/:foodId', function(req, res, next) {
  return res.json('hello')
  //   const foodName = 'honey crisp';
  //   const url =
  //   {
  //       uri: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
  //       headers: {
  //       'appId': 'd5418b85',
  //       'appKey': 'ddc6228322dfe36efb7b3b24fb778763',
  //       },
  //       body: {
  //         "query": `${foodName}`
  //       }
  //   }
  //   requestPromise.get(url, (error, response, body) => {
  //       let json = JSON.parse(body);
  //       return json.foods;
  //   })
  //   .then()
  //   .catch(next)
  });

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


module.exports = router
