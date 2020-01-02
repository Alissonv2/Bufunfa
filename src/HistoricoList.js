import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class HistoricoList extends Component {
    constructor(props) {
        super(props);

        let bg = '#02a31a'

        //alterando a cor do registro
        if (this.props.data.tipo == 'despesa') {
            bg = '#ef473a'
        }

        this.state = {
            bg: bg
        };

        this.alerta = this.alerta.bind(this);

    }

    alerta() {
        alert('Descrição: ' + this.props.data.descricao);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.detalhes} onPress={this.alerta} >
                    <Text style={[styles.texto, { color: this.state.bg }]}>  {this.props.data.tipo} </Text>
                    <Text style={[styles.texto, { color: this.state.bg }]}> R$ {this.props.data.valor} </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    detalhes: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        margin: 5,
        borderBottomWidth: 2,
        borderRadius: 10
    },

    texto: {
        fontSize: 22
    }
})