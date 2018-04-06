import Expo from 'expo'
import firebase from 'firebase'
import React, {Component} from 'react'
import {View, StyleSheet,} from 'react-native'
import FacebookButton from '../components/facebookButton'

export default class Login extends Component {

  authenticate = (token) => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInWithCredential(credential)
  }

  login = async () => {
    const ADD_ID = '1977451872571463'
    const options ={
      permissions: ['public_profile', 'email'],
    }
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
    if (type=== 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      console.log(await response.json())
      this.authenticate(token)
    }
  }


  render(){
    return(
    <View style={styles.container}>
      <FacebookButton
        onPress={this.login}
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})