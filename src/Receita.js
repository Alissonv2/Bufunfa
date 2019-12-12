import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput ,TouchableOpacity } from 'react-native'
import firebase from './Firebase';

export default class Receita extends Component {

    static navigationOptions = {
        title: 'Adicionar Receita',
        headerStyle: {
            backgroundColor: '#0093a3',
          },
          headerTintColor: '#fff'
    };

    constructor(props) {
        super(props);
        this.state = {
            valor: '',
            descricao: ''
        };

        this.adicionar = this.adicionar.bind(this);
    }

    adicionar(){
        if (this.state.valor != ''){

            //pegando uid do user logado
            let uid = firebase.auth().currentUser.uid;

            //criando o histórco dentro da database
            //e gerando uma chave
            let key = firebase.database().ref('historico').child(uid).push().key;

            //passando os valores
            firebase.database().ref('historico').child(uid).child(key).set({
                tipo: 'receita',
                valor: this.state.valor,
                descricao: this.state.descricao
            });

            //atualizar o saldo
           let user = firebase.database().ref('users').child(uid);

           //adicionar algo ao saldo usando once()
           //passando o snapshot
           user.once('value').then((snapshot)=>{

               //pegando o saldo e colocando na variável e somando com a state 'valor'
               let saldo = parseFloat(snapshot.val().saldo);
                saldo+= parseFloat(this.state.valor);

                //passando para o banco
                user.set({
                    saldo:saldo
                });
           });

           this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                
                <TextInput 
                        style={styles.input}
                        keyboardType="numeric"
                        autoFocus={true}
                        value={this.state.valor}
                        onChangeText={ (valor) => this.setState({valor}) }
                        placeholder="Valor da receita"
                />

                <TextInput 
                        style={styles.desc}                        
                        value={this.state.descricao}
                        onChangeText={ (descricao) => this.setState({descricao}) }
                        placeholder="Descreva ao que se refere"
                />
                <View style={styles.areaBtn}>
                    <TouchableOpacity style={styles.btnAdd} onPress={this.adicionar}>
                        <Text style={styles.txtAdd}>Adicionar Receita</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center'
    },

    input:{
        height: 50,
        backgroundColor: '#0093a3',
        marginTop: 20,
        padding: 5,
        fontSize: 25,
        textAlign: 'center',
        borderRadius: 10
    },

    desc:{
        height: 50,
        backgroundColor: '#0093a3',
        marginTop: 30,
        textAlign: 'center',
        padding: 5,
        fontSize: 18,
        borderRadius: 10
    },

    areaBtn: {
        alignItems: 'center'
    },

    btnAdd:{
        height: 50,
        width: 200,
        backgroundColor: '#ffbf00',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 25
    },

    txtAdd:{
        fontSize: 20,
        fontWeight: 'bold'
    }
})