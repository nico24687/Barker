import React, { Component } from 'react'
import {View} from 'react-native'
import Card from './card'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDU-nm14gcgIny0wOc-mh4OORHaS1vAzDo",
  databaseURL: "https://barkr-62548.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)




export default class App extends Component {

  state = {
    profileIndex: 0,
  }

  componentWillMount(){
    firebase.database().ref().child('users').once('value', (snap) => {
      console.log('Data', snap.val() )
    })
  }

  nextCard = () => {
    this.setState({ profileIndex: this.state.profileIndex + 1 })
  }

  render() {
    const {profileIndex} = this.state
    return(
      <View style={{flex:1}}>
        {profiles.slice(profileIndex, profileIndex + 3).reverse().map((profile) => {
          return(
            <Card
              key={profile.id}
              profile={profile}
              onSwipeOff={this.nextCard}
            />
          )
        })}
      </View>
    )
  }
}


const profiles = [
  {
    id: '190444725743',
    name: 'Candice',
    birthday: '10/18/2010',
    bio: 'Husky',
  },
  {
    id: '186534877553',
    name: 'Alessandra',
    birthday: '1/10/2014',
    bio: 'Dachshund',
  },
  {
    id: '1637993149777250',
    name: 'Miranda',
    birthday: '12/12/2012',
    bio: 'Chow Chow',
  },
  {
    id: '100009116132192',
    name: 'Alissa',
    birthday: '2/11/2017',
    bio: 'Shetland Sheepdog',
  },
  {
    id: '100013626468806',
    name: 'Behati',
    birthday: '3/23/2016',
    bio: 'Bearded Collie',
  },
  {
    id: '100015219160278',
    name: 'Rosie',
    birthday: '9/4/2015',
    bio: 'Corgi',
  },
  {
    id: '100005544228878',
    name: 'Kendall',
    birthday: '8/17/2014',
    bio: 'Japanese Chin',
  },
]

