import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableHighlight,
  Text,
  TextInput
} from 'react-native';

import firebase from './Firebase';

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor (props) {
    super(props);
    this.state = {

      email: '',
      senha: ''
    };

    this.enviar = this.enviar.bind(this);
    this.cadastrar = this.cadastrar.bind(this);
    firebase.auth().signOut();
  }



  enviar() {
    //Verificando inputs
    if (this.state.email != '' && this.state.senha != '') {

      //Direcionando para tela interna, caso usuário exista
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('Interna');
        }
      })
      //realizando o login
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
        .catch((error) => {
          alert(error.code);
        });
    }
  }


  cadastrar() {
    this.props.navigation.navigate('Cadastro');
  }


  render() {
    return (
      <ImageBackground source={ require('../assets/img/bg/bg.png') } style={ styles.bg }>

        <View style={ styles.container }>
          <Image source={ require('../assets/img/logo/logo.png') } style={ styles.logo } />
          <View style={ styles.containerEntrar } >

            <TextInput style={ styles.input }
              onChangeText={ (email) => this.setState({ email }) }
              placeholder="Digite seu email"
            />


            <TextInput secureTextEntry={ true }
              style={ styles.input }
              onChangeText={ (senha) => this.setState({ senha }) }
              placeholder="Digite sua Senha"
            />

            <TouchableHighlight style={ styles.btnEntrar } onPress={ this.enviar }>
              <Text style={ styles.txtEntrar }>Entrar</Text>
            </TouchableHighlight>

            <TouchableHighlight style={ styles.cadastrar } onPress={ this.cadastrar } underlayColor={ null }>
              <Text style={ styles.txtCadastro }>Não tem uma conta? Cadastre-se</Text>
            </TouchableHighlight>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    height: 200,
    width: 200
  },

  containerEntrar: {
    flex: 1,
    justifyContent: 'center',

  },

  txtInput: {
    fontSize: 20,
    color: '#292929'
  },

  input: {
    backgroundColor: '#fff',
    padding: 5,
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 17
  },

  btnEntrar: {
    backgroundColor: '#ffbf00',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  txtEntrar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },

  cadastrar: {
    marginTop: 30
  },

  txtCadastro: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  }

});
