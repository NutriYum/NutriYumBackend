const User = require('./user')
const FoodLogs = require('./foodLogs')
const Image = require('./image')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

FoodLogs.belongsTo(User)
User.hasMany(FoodLogs)  //cant delete user without deleting associated food logs

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  FoodLogs,
  Image
}
