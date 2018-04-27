// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardList from './cardList'
import SideBar from './sideBar'
import socket from '../clientSocket'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingRed: 9,
      remainingBlue: 8,
      redScore: 0,
      blueScore: 0,
      teamTurn: 'redTurn',
      reveal: false,
      cards: [],
      disableCards: false,
      user: this.props.user,
    }
  }

  componentDidMount() {
    socket.on('pickCards', (gameInfo) => {
      this.setState( gameInfo )
    })
    socket.on('updateScore', (gameInfo) => {
      this.setState(gameInfo)
    })
    socket.on('joinGame', (gameInfo) => {
      this.setState(gameInfo)
    })
    if (this.props.navigation.state.params.newGame) {
      fetch('http://172.17.20.46:8080/api/cards')
        .then(res => res.json())
        .then(foundCards => {
          this.setState({
            cards: foundCards,
          })
          socket.emit('pickCard', foundCards)
        })
    }
    else {
      console.log("game already started?")
      socket.emit('joinGame')
    }
  }

  componentWillUnmount() {
    socket.close()
  }

  revealPush = () => {
    this.setState({
      reveal: !this.state.reveal
    })
  }

  newRound = () => {
    fetch('http://172.17.20.46:8080/api/cards')
      .then(res => res.json())
      .then(foundCards => {
        this.setState({
          remainingRed: 9,
          remainingBlue: 8,
          teamTurn: 'redTurn',
          disableCards: false,
          cards: foundCards,
          reveal: false
        })
      })

  }

  newGame = () => {
    this.setState({
      redScore: 0,
      blueScore: 0,
    }, this.newRound)
  }

  endRound = (winningTeam) => {
    if (winningTeam === 'red') {
      this.setState({
        redScore: this.state.redScore + 1,
        disableCards: true
      }, () => socket.emit('updateScore', this.state))
      alert("Red Team Wins!")
    } else {
      this.setState({
        blueScore: this.state.blueScore + 1,
        disableCards: true
      }, () => socket.emit('updateScore', this.state))
      alert("Blue Team Wins!")
    }
  }

  scorePoint = (team) => {
    if (team === 'red') {
      this.setState({
        remainingRed: this.state.remainingRed - 1,
        teamTurn: this.state.teamTurn === 'redTurn' ? 'blueTurn' : 'redTurn'
      }, () => {
        socket.emit('updateScore', this.state)
        if (!this.state.remainingRed) this.endRound('red')
      })

    } else if (team === 'blue') {
      this.setState({
        remainingBlue: this.state.remainingBlue - 1,
        teamTurn: this.state.teamTurn === 'redTurn' ? 'blueTurn' : 'redTurn'
      }, () => {
        socket.emit('updateScore', this.state)
        if (!this.state.remainingBlue) this.endRound('blue')
      })

    } else if (team === 'assasin') {
      if (this.state.teamTurn === 'redTurn') {
        this.endRound('blue')
      } else {
        this.endRound('red')
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <View>
        <SideBar
          myState={this.state}
          revealPush={this.revealPush}
          reveal={this.state.reveal}
          newRound={this.newRound}
          newGame={this.newGame}
          navigation={this.props.navigation}
        />
        <CardList
          scorePoint={this.scorePoint}
          reveal={this.state.reveal}
          cards={this.state.cards}
          disableCards={this.state.disableCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
});

