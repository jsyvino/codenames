// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import socket from '../clientSocket'


export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            game: false,
            gameInfo: {},
            remainingRed: 9,
            remainingBlue: 8,
            redScore: 0,
            blueScore: 0,
            teamTurn: 'redTurn',
            reveal: false,
            cards: [],
            disableCards: false,
            user: this.props.navigation.state.params.user
        }
    }

    componentDidMount() {
        Keyboard.dismiss();
        socket.on('startGame', (gameInfo) => {
            this.setState(gameInfo)
        })
        socket.on('joinGame', (gameInfo) => {
            this.setState({
                gameInfo: gameInfo
            })
        })
    }

    componentWillUnmount() {
        socket.close()
    }

    render() {
        console.log("PROPS HERE", this.props)
        let params = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Welcome {this.state.user.username}!</Text>
                </View>

                {
                    !this.state.game ?
                        <TouchableOpacity
                            onPress={() => {
                                socket.emit('startGame', this.state)
                                this.props.navigation.navigate('Game', {
                                    user: this.state.user,
                                    newGame: true
                                })
                            }
                            }
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Start Game</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Game', {
                                    user: this.state.user,
                                })
                            }
                            }
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Join Game</Text>
                        </TouchableOpacity>
                }
                {/*}
                <TouchableOpacity
                    onPress={() => {
                        params.logoutUser() 
                    }}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGOUT</Text>
                </TouchableOpacity>
                */}
                <View style={styles.formContaner}>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#1abc9c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    welcome: {
        color: 'white',
        marginTop: 10,
        fontSize: 34,
    },
    buttonContainer: {
        backgroundColor: '#16a085',
        paddingVertical: 15,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        opacity: 0.8
    }
})
