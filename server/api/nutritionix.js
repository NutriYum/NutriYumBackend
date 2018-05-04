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
        uri: 'https://api.nutritionix.com/v1_1/search',
        body: {
        "appId": "d5418b85",
        "appKey": "ddc6228322dfe36efb7b3b24fb778763",
        // "Content-Type": "application/json",
        "query": `${foodName}`
        },
        json: true
    }
    requestPromise(options)
    .then(foods => {
      res.json(foods)
    })
    .catch(next)
    // requestPromise.post(url, (error, response, body) => {
    //     // let json = JSON.parse(response);
    //     res.json(response);
    // })
    // // .then(foods => {
    // //     let json = JSON.parse(foods);
    // //     return res.send(json);
    // // })
    // .catch(next)
  });

module.exports = router
