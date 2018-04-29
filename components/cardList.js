// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import socket from '../clientSocket'
const Dim = require('Dimensions');
const myWindow = Dim.get('window');
let cardWidth = (Dim.get('window').width > Dim.get('window').height) ? (Dim.get('window').width - 20) / 5 - 5 : (Dim.get('window').height - 20) / 5 - 5
let cardHeight = (Dim.get('window').width > Dim.get('window').height) ? (Dim.get('window').height - 100) / 5 - 5 : (Dim.get('window').width - 100) / 5 - 5

export default class CardList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: this.props.cards,
      orientation: Dim.get('window').height > Dim.get('window').width ? "portrait" : "landscape",
    } 
}

componentDidMount () {
  Dimensions.addEventListener('change', () => {
    let orientation = Dim.get('window').height > Dim.get('window').width ? "portrait" : "landscape"
    this.setState({
      orientation: orientation
    });
  })
}

  componentWillReceiveProps(nextProps) {
    if (this.props.cards !== nextProps.cards) {
      this.setState({
        cards: nextProps.cards
      })
    }
  }

  selectCard = (clickedCard) => {
    if (!this.props.disableCards) {
      let newCards = this.state.cards.map(card => {
        if (clickedCard.id === card.id) {
          this.props.scorePoint(clickedCard.color);
          card.selected = true;
          return card;
        } else return card;
      })
      this.setState({
        cards: newCards
      }, () => {
        socket.emit('pickCard', newCards)
      })
    }
  }


  render() {
    let orientation = this.state.orientation
    return ( 
      <View>
      {
        orientation === 'portrait' ?
        <View style={styles.rotate}>
        <Text style={styles.rotateText}>Please rotate your screen to play</Text>
        </View>
        :
      <View style={styles.container}>
        {
          this.state.cards.map(card => {
            return (
              <TouchableOpacity
                key={card.id}
                style={(card.selected || this.props.reveal) ? styles[card.color] : styles.unselected}
                onPress={(evt) => this.selectCard(card)}>

                <Text style={((card.color === 'assasin' && (card.selected || this.props.reveal)) || card.selected) ? styles.assasinText : styles.cardText}>
                  {(card.color === 'assasin' && (card.selected || this.props.reveal)) ? `💥${card.word}💥` : card.word}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    }
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: 'beige',
    alignItems: 'stretch',
    flexGrow: 5
  },
  text: {
    color: '#4f603c'
  },
  cardText: {
    color: 'black',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  assasinText: {
    color: 'white',
    fontSize: 18,
    textAlignVertical: 'center',
    fontStyle: 'italic'
  },
    unselected: {
      padding: 10,
      marginRight: 5,
      marginTop: 3,
      backgroundColor: 'white',
      alignItems: 'center',
      width: cardWidth,
      height: cardHeight,
    },
    red: {
      padding: 10,
      marginRight: 5,
      marginTop: 3,
      backgroundColor: '#ffb3b3',
      alignItems: 'center',
      width: cardWidth,
      height: cardHeight,
    },
    blue: {
      padding: 10,
      marginRight: 5,
      marginTop: 3,
      backgroundColor: '#b3d1ff',
      alignItems: 'center',
      width: cardWidth,
      height: cardHeight,
    },
    assasin: {
      padding: 10,
      marginRight: 5,
      marginTop: 3,
      backgroundColor: 'black',
      alignItems: 'center',
      width: cardWidth,
      height: cardHeight,
    },
    bystander: {
      padding: 10,
      marginRight: 5,
      marginTop: 3,
      backgroundColor: '#ffc266',
      alignItems: 'center',
      width: cardWidth,
      height: cardHeight,
    },
    rotate: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#bdc3c7',
      height: myWindow.height > myWindow.width ? myWindow.height : myWindow.width,
      width: myWindow.width < myWindow.height ? myWindow.width : myWindow.height
    },
    rotateText: {
      color: '#9b59b6',
      fontSize: 40,
      fontWeight: '800',
      textAlign: 'center'
    }

})

