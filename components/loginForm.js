// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
const Dimensions = require('Dimensions');
const myWindow = Dimensions.get('window');

export default class LoginForm extends React.Component {

    loginUser = () => {
        
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
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="#16a085"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                />
                <TouchableOpacity style={styles.buttonContainer}>
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