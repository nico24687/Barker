import React, {Component} from 'react'
import {StyleSheet, View, Text, } from 'react-native'
import CircleImage from '../components/circleImage'
import Slider from 'react-native-multi-slider-cloneable'

export default class Profile extends Component{
  render(){
    const {first_name,id} = this.props.user
    return(
      <View style={styles.container}>
        <View style={styles.profile}>
          <CircleImage facebookID={id} size={120}/>
          <Text style={{fontSize: 20}}>{first_name}</Text>
        </View>
        <Slider
          values={[1,10]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})