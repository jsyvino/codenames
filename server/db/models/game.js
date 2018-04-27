const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  word: {
    type: Sequelize.STRING,
    defaultValue: null
  }
})

module.exports = Game
