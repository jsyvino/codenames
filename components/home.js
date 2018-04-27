// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
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
        }
    }

    componentDidMount() {
        socket.on('startGame', (gameInfo) => {
            console.log("GETTING HERE, startgame in home", gameInfo)
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
        // let params = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Welcome {"BOB" || params.user.username}!</Text>
                </View>
                <TextInput
                    placeholder="new game"
                    placeholderTextColor="#16a085"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ game: text })}
                    style={styles.input}
                />
                {
                    !this.state.game ?
                        <TouchableOpacity
                            onPress={() => {
                                socket.emit('startGame', this.state)
                                this.props.navigation.navigate('Game', {
                                    user: "BOB",
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
                                    user: "SAM" || params.user,
                                })
                            }
                            }
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Join Game</Text>
                        </TouchableOpacity>
                }

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
    },
    welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    welcome: {
        color: 'white',
        marginTop: 10,
        fontSize: 26,
    },
    buttonContainer: {
        backgroundColor: '#16a085',
        paddingVertical: 15
    },
    logo: {
        width: 120,
        height: 120
    },
})