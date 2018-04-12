import React, {Component} from 'react'
import {StyleSheet, View, Text, Switch,} from 'react-native'
import CircleImage from '../components/circleImage'
import Slider from 'react-native-multi-slider-cloneable'
import * as firebase from 'firebase'

export default class Profile extends Component{

  state={
    ageRangeValues: [0,16],
    distnaceValue: [5],
    showMen: false,
    showWomen: false,
  }

  updateUser = (value) => {
    const {uid} = this.props.user
    firebase.database().ref('users').child(uid)
      .update({test: value})
  } 

  render(){
    const {first_name,id} = this.props.user
    const {ageRangeValues, distnaceValue, showMen, showWomen} = this.state
    return(
      <View style={styles.container}>
        <View style={styles.profile}>
          <CircleImage facebookID={id} size={120}/>
          <Text style={{fontSize: 20}}>{first_name}</Text>
        </View>
        <View style={styles.label}>
          <Text>Distance</Text>
          <Text style={{ color: 'darkgrey' }}>{distnaceValue}km</Text>
        </View>
        <Slider
          min={1}
          max={30}
          values={distnaceValue}
          onValuesChange={val => this.setState({ distnaceValue: val })}
          onValuesChangeFinish={val => this.updateUser(val) }
        />
        <View style={styles.label}>
          <Text>Age Range</Text>
          <Text style={{color: 'darkgrey'}}>{ageRangeValues.join('-')}</Text>
        </View>
        <Slider
          min={0}
          max={16}
          values={ageRangeValues}
          onValuesChange={val => this.setState({ageRangeValues:val})}
        />
        <View style={styles.switch}>
          <Text>Show Male</Text>
          <Switch
            value={showMen}
            onValueChange={val => this.setState({showMen:val})}
          />
        </View>
        <View style={styles.switch}>
          <Text>Show Female</Text>
          <Switch
            value={showWomen}
            onValueChange={val => this.setState({ showWomen: val })}
          />
        </View>
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
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 50,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,

  }
})