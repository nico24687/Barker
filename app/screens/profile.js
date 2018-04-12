import React, {Component} from 'react'
import {StyleSheet, View, Text, } from 'react-native'

export default class Profile extends Component{
  render(){
    const {first_name} = this.props.user
    return(
      <View style={styles.container}>
        <Text>{first_name}</Text>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})