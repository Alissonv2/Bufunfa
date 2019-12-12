import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class HistoricoList extends Component {
    constructor(props) {
        super(props);

        let bg = '#38ef7d'

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
                <TouchableOpacity style={[styles.detalhes, { backgroundColor: this.state.bg }]} onPress={this.alerta} >
                    <Text style={styles.texto}>  {this.props.data.tipo} </Text>
                    <Text style={styles.texto}> R$ {this.props.data.valor} </Text>
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
        backgroundColor: '#ccc',
        paddingTop: 5,
        margin: 5
    },

    texto: {
        fontSize: 22,
        color: '#292929'
    }
})