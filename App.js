import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.card}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 100,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
})