// @flow
import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import Game from './game'
import Login from './login'
import Home from './home'
import { StackNavigator } from 'react-navigation';
import '../clientSocket'

const user = {
    username: 'bobbidyBob',
    email: 'bob@bob.com',
}

const RootStack = StackNavigator({
    Home: { screen: Home },
    Login: { screen: Login },
    Game: { screen: Game },
},
    {
        initialRouteName: 'Home',
    });


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: user,
            game: false,
        }
    }

    setUser = (user) => {
        this.setState({
            user: user
        })
    }

    render() {
        return (
            <RootStack />
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});


