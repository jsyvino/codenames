// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
const Dimensions = require('Dimensions');
const myWindow = Dimensions.get('window');
import { StackNavigator } from 'react-navigation';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                email: '',
                password: '',
                username: '',
            },
            signup: false
        }
    }

    loginUser = () => {
        // fetch('http://172.17.20.46:8080/auth/login', {     //fullstack
        fetch('http://192.168.1.77:8080/auth/login', {     //home
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(user => {
                this.setState({
                    user: user,
                }, () => {
                    this.props.navigation.navigate('Home', {
                        user: user,
                        logoutUser: this.logoutUser
                    })
                })
            })
    }
    signUpUser = () => {
        // fetch('http://172.17.20.46:8080/auth/login', {     //fullstack
        fetch('http://192.168.1.77:8080/auth/signup', {     //home
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            })
        })
            .then(res => res.json())
            .then(user => {
                this.setState({
                    user: user,
                }, () => {
                    this.props.navigation.navigate('Home', {
                        user: user,
                        logoutUser: this.logoutUser
                    })
                })
            })
    }

    logoutUser = () => {
        console.log("getting here on logout????")
        this.setState({
            user: {},
        }, () => this.props.navigation.navigate('Login'))
    }


    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                {
                    !this.state.signup ?
                        <View />
                        :
                        <TextInput
                            placeholder="username"
                            placeholderTextColor="#16a085"
                            returnKeyType="next"
                            onSubmitEditing={() => this.emailInput.focus()}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({ username: text })}
                            style={styles.input}
                        />
                }
                <TextInput
                    placeholder="email"
                    placeholderTextColor="#16a085"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={styles.input}
                    ref={(input) => this.emailInput = input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="#16a085"
                    returnKeyType="go"
                    autoCapitalize="none"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() => this.state.signup ? this.signUpUser() : this.loginUser()}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>{this.state.signup ? 'SIGN UP' : 'LOGIN'}</Text>
                    </TouchableOpacity>
                    {
                        this.state.signup ?
                            <View />
                            :
                            <TouchableOpacity
                                onPress={() => this.setState({ signup: true })}
                                style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>SIGN UP</Text>
                            </TouchableOpacity>
                    }
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        color: 'black',
        opacity: .5,
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: '#16a085',
        padding: 15,
        marginBottom: 10,
        marginLeft: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '800',
        fontSize: 18
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})