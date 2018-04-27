const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  word: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  selected: {
    type: Sequelize.STRING,
    defaultValue: null
  },
})

module.exports = Card
