// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';


export default class Home extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Welcome {this.props.user.username}</Text>
                </View>
                <View style={styles.formContaner}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#1abc9c',

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