const router = require('express').Router()
const {Image} = require('../db/models')
module.exports = router

router.param('imageId', async (req, res, next, imageId) => {
  try {
    const image = await Image.findById(imageId);
    req.image = image;
    next();
  }
  catch (err) {
    next(err);
  }
})

router.get('/',  async (req, res, next) => {
  try {
    const allimages = await Image.findAll()
    res.json(allimages)
  }
  catch (err){
    next(err)
  }
})

router.get('/:imageId', (req, res, next) => {
  res.json(req.image)
})

router.post('/create', async (req, res, next) => {
  try {
    const image = await User.create(req.body)
    res.json(image)
  }
  catch (err) {
    next(err)
  }
})
