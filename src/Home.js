import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {}

    this.entrar = this.entrar.bind(this);
    this.cadastrar = this.cadastrar.bind(this);

  }

  entrar(){
    this.props.navigation.navigate('Login');
   }

  cadastrar(){
    this.props.navigation.navigate('Cadastro');
   }


  render() {
    return (
      <ImageBackground source={require('../assets/img/bg/bg.png')} style={styles.bg}>

        <View style={styles.container}>
          <Image source={require('../assets/img/logo/logo.png')} style={styles.logo} />
          
            <TouchableHighlight style={styles.btnEntrar} onPress={this.entrar}>
              <Text style={styles.txtEntrar}>Entrar</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.cadastrar} onPress={this.cadastrar} underlayColor={null}>
              <Text style={styles.txtCadastro}>Não tem uma conta? Cadastre-se</Text>
            </TouchableHighlight>
          
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

  logo:{
    height: 200,
    width: 200
  },

  btnEntrar: {
    backgroundColor: '#ffbf00',
    alignItems: 'center',
    marginTop: 60,
    justifyContent:'center',
    width: 300,
    height: 50,
    borderRadius: 10
  },
  txtEntrar:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },

  cadastrar:{
    marginTop: 30
  },

  txtCadastro:{
    color: '#ffbf00',
    fontSize: 15
  }

});
