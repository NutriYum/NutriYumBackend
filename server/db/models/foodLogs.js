const Sequelize = require('sequelize')
const db = require('../db')


const FoodLogs = db.define('foodLogs', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sugar: {
        type: Sequelize.INTEGER,
    },
    calories: {
        type: Sequelize.INTEGER,
    },
    totalFat: {
        type: Sequelize.INTEGER,
    },
    sodium: {
        type: Sequelize.INTEGER,
    },
    protein: {
        type: Sequelize.INTEGER,
    },
    carbs: {
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    servingUnit: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
})

//Helper function
function lessDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  const Op = Sequelize.Op

FoodLogs.oneDay = function (userId){
    return this.findAll({
        where: {
            $and: [
                { userId: userId },
                Sequelize.where(
                   Sequelize.fn('DATE', Sequelize.col('date')),
                   Sequelize.literal('CURRENT_DATE')
                )
            ]
         }
    })
}

FoodLogs.oneWeek = function (userId){
    let endDate = lessDays(Date.now(), 7)
    return this.findAll({
        where: {
            userId: userId,
            date: {[Op.gte]: endDate}
         }
    })
}

FoodLogs.oneMonth = function (userId){
    let endDate = lessDays(Date.now(), 30)
    return this.findAll({
        where: {
            userId: userId,
            date: {[Op.gte]: endDate}
         }
    })

}

///// GET ALL USERS DATA /////

FoodLogs.oneDayAll = function (){
    return this.findAll({
        where: {
            $and: [
                Sequelize.where(
                   Sequelize.fn('DATE', Sequelize.col('date')),
                   Sequelize.literal('CURRENT_DATE')
                )
            ]
         }
    })
}

FoodLogs.oneWeekAll = function (){
    let endDate = lessDays(Date.now(), 7)
    return this.findAll({
        where: {
            date: {[Op.gte]: endDate}
         }
    })
}

FoodLogs.oneMonthAll = function (){
    let endDate = lessDays(Date.now(), 30)
    return this.findAll({
        where: {
            date: {[Op.gte]: endDate}
         }
    })
}


module.exports = FoodLogs
