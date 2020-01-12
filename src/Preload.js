import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Text
} from 'react-native';

import firebase from './Firebase';

import { NavigationActions, StackActions } from 'react-navigation';

export default class Preload extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {}

        //verificando se há usuário logado
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //fazendo o usuário sair do app caso clique no btn 'voltar'
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Interna' })
                    ]
                }));
            } else {
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' })
                    ]
                }));
            }
        })
    }

    render() {
        return (
            <ImageBackground source={require('../assets/img/bg/bg.png')} style={styles.bg}>

                <View style={styles.container}>
                    <Image source={require('../assets/img/logo/logo.png')} style={styles.logo} />
                    <Text style={styles.loading}> Carregando. . . </Text>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: null

    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        height: 200,
        width: 200
    },

    loading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10
    }

})