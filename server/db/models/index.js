const User = require('./user')
const Card = require('./card')
const Game = require('./game')
const db = require('../db')

User.belongsToMany(Game, {through: 'UserGame'})
Game.belongsToMany(User, {through: 'UserGame'})

module.exports = {
  db,
  User,
  Card,
  Game
}
