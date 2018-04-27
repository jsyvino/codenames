const { User, Card, Game } = require('../db/models')

let gameInfo = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('pickCard', cards => {
      gameInfo.cards = cards
      gameInfo.reveal = false
      socket.broadcast.emit('pickCards', gameInfo);
    });

    socket.on('startGame', (gameState) => {
      gameInfo = gameState
      gameInfo.reveal = false
      gameInfo.game = true;
      console.log(gameState)
      socket.broadcast.emit('startGame', gameInfo);
    });

    socket.on('joinGame', () => {
      gameInfo.reveal = false
      socket.emit('joinGame', gameInfo);
    });

    socket.on('updateScore', scoreData => {
      gameInfo = scoreData
      gameInfo.reveal = false
      socket.broadcast.emit('updateScore', gameInfo);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
