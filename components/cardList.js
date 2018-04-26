// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
const Dimensions = require('Dimensions');
const myWindow = Dimensions.get('window');

export default class CardList extends React.Component {
  state = {
    cards: this.props.cards
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
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {
          this.state.cards.map(card => {
            return (
              <TouchableOpacity
                key={card.id}
                style={(card.selected || this.props.reveal) ? styles[card.color] : styles.unselected}
                onPress={(evt) => this.selectCard(card)}>

                <Text style={( (card.color === 'assasin' && card.selected) || card.selected) ? styles.assasinText : styles.cardText}>
                  {(card.color === 'assasin' && (card.selected || this.props.reveal)) ? '💥' : card.word}
                </Text>
              </TouchableOpacity>
            )
          })
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
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    marginRight: 5,
    marginTop: 3,
    backgroundColor: '#ffb3b3',
    alignItems: 'center',
    width: (myWindow.width - 20) / 5 - 5,
    height: (myWindow.height - 100) / 5 - 5,
  },
  red: {
    padding: 10,
    marginRight: 5,
    marginTop: 3,
    backgroundColor: '#ffb3b3',
    alignItems: 'center',
    width: (myWindow.width - 20) / 5 - 5,
    height: (myWindow.height - 100) / 5 - 5,
  },
  blue: {
    padding: 10,
    marginRight: 5,
    marginTop: 3,
    backgroundColor: '#b3d1ff',
    alignItems: 'center',
    width: (myWindow.width - 20) / 5 - 5,
    height: (myWindow.height - 100) / 5 - 5,
  },
  assasin: {
    padding: 10,
    marginRight: 5,
    marginTop: 3,
    backgroundColor: 'black',
    alignItems: 'center',
    width: (myWindow.width - 20) / 5 - 5,
    height: (myWindow.height - 100) / 5 - 5,
  },
  bystander: {
    padding: 10,
    marginRight: 5,
    marginTop: 3,
    backgroundColor: '#ffc266',
    alignItems: 'center',
    width: (myWindow.width - 20) / 5 - 5,
    height: (myWindow.height - 100) / 5 - 5,
  },
  unselected: {
    padding: 10,
    marginRight: 5,
    marginTop: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    width: (myWindow.width - 20) / 5 - 5,
    height: (myWindow.height - 100) / 5 - 5,
  }
})

