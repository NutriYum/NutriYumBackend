const Sequelize = require('sequelize')
const db = require('../db')


const Foods = db.define('foods', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    calories: {
        type: Sequelize.INTEGER,
    },
    totalFat: {
        type: Sequelize.INTEGER,
    }, 
})

module.exports = Foods