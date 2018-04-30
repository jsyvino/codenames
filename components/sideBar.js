// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Dimensions } from 'react-native';
const Dim = require('Dimensions');

export default class SideBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            orientation: Dim.get('window').height > Dim.get('window').width ? "portrait" : "landscape",
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', () => {
            let orientation = Dim.get('window').height > Dim.get('window').width ? "portrait" : "landscape"
            this.setState({
                orientation: orientation
            });
        })
    }

    render() {
        const { remainingRed, remainingBlue, redScore, blueScore, teamTurn } = this.props.myState
        return (
            <View style={styles.container}>
                {
                    this.state.orientation === 'portrait' ?
                        <View />
                        :
                        <View style={styles[teamTurn]}>

                            <View style={styles.column}>
                                <Text style={textStyle.text}>Game Score</Text>
                                <View style={styles.scores}>
                                    <Text style={redScoreSty.text}>{redScore}</Text>
                                    <Text style={blueScoreSty.text}>{blueScore}</Text>
                                </View>
                            </View>

                            <View style={styles.column}>
                                <Text style={textStyle.text}>Remaining</Text>
                                <View style={styles.scores}>
                                    <Text style={redScoreSty.text}>{remainingRed}</Text>
                                    <Text style={blueScoreSty.text}>{remainingBlue}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={buttonStyle.container}
                                onPress={this.props.newGame}>
                                <Text style={buttonStyle.text}>
                                    Start New Game
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={buttonStyle.container}
                                onPress={this.props.newRound}>
                                <Text style={buttonStyle.text}>
                                    Start New Round
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={this.props.reveal ? buttonStyle.revealStyle : buttonStyle.container}
                                onPress={this.props.revealPush}>
                                <Text style={this.props.reveal ? buttonStyle.revealText : buttonStyle.text}>
                                    Code Master
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={buttonStyle.container}
                                onPress={() => {
                                    this.props.navigation.navigate('Home', {
                                        user: this.state.user,
                                    })
                                }}>
                                <Text style={buttonStyle.text}>
                                    Exit
                                </Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    blueTurn: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        paddingTop: 25,
        paddingBottom: 15,
        backgroundColor: '#00315c',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 80
    },
    redTurn: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        paddingTop: 25,
        paddingBottom: 15,
        backgroundColor: '#8b0000',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 80
    },
    text: {
        color: '#ffffff',
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        alignSelf: 'center'
    },
    scores: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 1,
    },
    container: {
        width: Dim.get('window').height > Dim.get('window').width ? Dim.get('window').height : Dim.get('window').width,
        display: 'flex',
        justifyContent: 'space-around'
    }
})

const redScoreSty = StyleSheet.create({
    text: {
        color: '#ffb3b3',
        marginRight: 10,
        fontSize: 20
    }
})

const blueScoreSty = StyleSheet.create({
    text: {
        color: '#b3d1ff',
        fontSize: 20
    }
})

const buttonStyle = StyleSheet.create({
    container: {
        padding: 10,
        marginRight: 1,
        marginTop: 3,
        backgroundColor: 'gray',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    revealStyle: {
        padding: 10,
        marginRight: 1,
        marginTop: 3,
        backgroundColor: '#FDFF14',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    revealText: {
        color: 'black'
    },
    text: {
        color: 'white'
    }
})

const textStyle = StyleSheet.create({
    text: {
        color: '#ffffff'
    }
})