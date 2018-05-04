const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
    picture: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
})

module.exports = Image