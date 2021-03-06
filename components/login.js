// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './loginForm'
const Dimensions = require('Dimensions');
const myWindow = Dimensions.get('window');

export default class Login extends React.Component {

    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../images/logo.png')} />
                </View>
                <View style={styles.formContaner}>
                    <LoginForm
                        setUser={this.props.setUser}
                        user={this.props.user}
                        navigation={this.props.navigation}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#1abc9c',
        width: myWindow.width,
        height: myWindow.height,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    logo: {
        width: 120,
        height: 120
    },
    logoText: {
        color: 'white',
        marginTop: 10,
        fontSize: 20,
        opacity: .8
    }
})