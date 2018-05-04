const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
    picture: {
        type: Sequelize.TEXT,
        defaultValue: ''
    }
})

module.exports = Image
