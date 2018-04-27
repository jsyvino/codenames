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
                password: ''
            }
        }
    }

    loginUser = () => {
        fetch('http://172.17.20.46:8080/auth/login', {
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
                console.log(user)
                this.setState({
                    user: user,
                }, () => {
                    this.props.navigation.navigate('Home', {
                        user: user
                    })
                })
            })
    }


    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    placeholder="email"
                    placeholderTextColor="#16a085"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({email: text})}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="#16a085"
                    returnKeyType="go"
                    autoCapitalize="none"
                    secureTextEntry
                    onChangeText={(text) => this.setState({password: text})}
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                />
                <TouchableOpacity
                    onPress={this.loginUser}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
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
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '800',
        fontSize: 18
    }
})