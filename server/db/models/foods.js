const Sequelize = require('sequelize')
const db = require('../db')


const Foods = db.define('foods', {
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
})

module.exports = Foods
