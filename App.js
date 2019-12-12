import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Rotas from './src/Rotas';

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Rotas/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});