import React, { Component } from 'react'
import * as firebase from 'firebase'
import Home from './screens/home'
import Login from './screens/login'

const firebaseConfig = {
  apiKey: "AIzaSyDU-nm14gcgIny0wOc-mh4OORHaS1vAzDo",
  databaseURL: "https://barkr-62548.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

export default class App extends Component {
  render(){
    return(
      <Login/>
    )
  }
}