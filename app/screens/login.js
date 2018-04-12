import Expo from 'expo'
import firebase from 'firebase'
import React, {Component} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import {NavigationActions } from 'react-navigation'
import FacebookButton from '../components/facebookButton'

export default class Login extends Component {

  state = {
    showSpinner: true,
  }

  componentDidMount() {
    firebase.auth().signOut()
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.firebaseRef = firebase.database().ref('users')
        this.firebaseRef.child(auth.uid).on('value', snap => {
          const user = snap.val()
          if (user != null){
            this.firebaseRef.child(auth.uid).off('value')
            this.goHome(user)
          }
        })
        
      } else {
        this.setState({ showSpinner: false })
      }
    })
  }

  goHome(user){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home', params: { user} }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  authenticate = (token) => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    return firebase.auth().signInWithCredential(credential)
  }

  createUser = (uid, userData) => {
    const defaults = {
      uid,
      distance: 5,
      ageRange: [0,16],
    }
    firebase.database().ref('users').child(uid).update({ ...userData, ...defaults })
  }

  login = async () => {
    const ADD_ID = '1977451872571463'
    const options ={
      permissions: ['public_profile', 'user_birthday', 'email'],
    }
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
    if (type=== 'success') {
      this.setState({ showSpinner: true })
      const fields = ['id', 'first_name', 'last_name', 'gender', 'birthday', 'locale']
      const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`)
      const userData = await response.json()
      const {uid} = await this.authenticate(token)
      this.createUser(uid, userData)
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.showSpinner ?
          <ActivityIndicator animating={this.state.showSpinner} /> :
          <FacebookButton onPress={this.login} />
        }
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