import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

import HistoricoList from './HistoricoList';
import firebase from './Firebase';

import { NavigationActions, StackActions } from 'react-navigation';

export default class Interna extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      saldo: 0,
      hist: [],
      bgSaldo: '#fff'
    };

    this.receita = this.receita.bind(this);
    this.despesas = this.despesas.bind(this);
    this.logout = this.logout.bind(this);

    //verificando se tem usuário logado
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;

        //buscando o saldo no firebase
        firebase.database().ref('users').child(uid).on('value', (snapshot) => {
          let state = this.state;
          state.saldo = snapshot.val().saldo;

          if (state.saldo < 0) {
            state.bgSaldo = '#ef473a'
          } else {
            state.bgSaldo = '#fff'
          }

          this.setState(state);
        });

        //olheiro do histórico
        firebase.database().ref('historico').child(uid).on('value', (snapshot) => {
          let state = this.state;
          state.hist = [];

          snapshot.forEach((childItem) => {
            state.hist.push({
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              descricao: childItem.val().descricao
            });
          });
          //atualizando a state 'hist'
          state.hist.reverse();
          this.setState(state);
        });

      }

    })
  }

  receita() {
    this.props.navigation.navigate('Receita');
  }

  despesas() {
    this.props.navigation.navigate('Despesas');
  }

  logout() {
    alert('Deslogado com sucesso!');

    firebase.auth().signOut();

    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    }));
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.areaSaldo}>

          <View style={styles.logout}>
            <TouchableOpacity onPress={this.logout}>
              <Image source={ require('../assets/img/sair.png') } style={ { width: 20, height: 25, marginLeft: 7 } } />
              <Text style={styles.sair}>Sair</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.saldo, { color: this.state.bgSaldo }]}>Saldo: R$ {this.state.saldo.toFixed(2)}</Text>

          <View style={styles.btnArea}>

            <TouchableOpacity style={styles.btn} onPress={this.receita}>
              <Text style={styles.txtBtn} >+ Receita</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ styles.btn } onPress={this.despesas}>
              <Text style={styles.txtBtn} >+ Despesas</Text>
            </TouchableOpacity>

          </View>

        </View>

        <FlatList
          style={styles.hist}
          data={this.state.hist}
          renderItem={({ item }) => <HistoricoList data={item} />}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  areaSaldo: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#02a31a'
  },
  logout: {
    alignItems: 'center',
    height: 40,
    width: 30
  },
  sair: {
    color: '#fff',
    marginLeft: 5
  },
  saldo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 25
  },

  btn: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 30,
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtBtn: {
    fontSize: 18,
    color: '#fff'
  },
  hist: {
    flex: 1
  }
});