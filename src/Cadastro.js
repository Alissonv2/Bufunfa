import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import firebase from './Firebase';

export default class Cadastro extends Component {

  static navigationOptions = {
    title: 'Cadastrar',
    headerStyle: {
      backgroundColor: '#0093a3',
    },
    headerTintColor: '#fff'
  };

  constructor(props) {
    super(props);
    this.state = {

      email: '',
      senha: ''
    };

    this.enviar = this.enviar.bind(this);
    firebase.auth().signOut();
  }



  enviar() {
    if (this.state.email != '' && this.state.senha != '') {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {

          let uid = user.uid;
          firebase.database().ref('users').child(uid).set({
            saldo: 0
          });

          this.props.navigation.navigate('Interna');
        }
      })

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
        .catch((error) => {
          alert(error.code);
        });
    }
  }

  render() {
    return (
    <ImageBackground source={require('../assets/img/bg/coins.png')} style={styles.bg}>  
      <View style={styles.container}>
        <Text style={styles.txtInput}>Email</Text>
        <TextInput style={styles.input} onChangeText={(email) => this.setState({ email })} />

        <Text style={styles.txtInput}>Senha</Text>
        <TextInput style={styles.input} onChangeText={(senha) => this.setState({ senha })} />

        <TouchableOpacity style={styles.btn} onPress={this.enviar}>
          <Text style={styles.txtBtn}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>  
    );
  }
}

const styles = StyleSheet.create({
  bg:{
    flex: 1,
    width: null
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },

  txtInput: {
    fontSize: 20,
    color: '#292929'
  },

  input: {
    backgroundColor: '#0093a3',
    padding: 5,
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 17
  },

  btn: {
    height: 40,
    backgroundColor: '#ffbf00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 20
  },

  txtBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
});