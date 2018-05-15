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


module.exports = FoodLogs
