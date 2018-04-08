import Expo from 'expo'
import React, { Component } from 'react'
import { View } from 'react-native'
import Card from '../components/card'
import * as firebase from 'firebase'
import GeoFire from 'geofire'





export default class Home extends Component {

  state = {
    profileIndex: 0,
    profiles: [],
  }

  componentWillMount() {
    const { uid } = this.props.navigation.state.params
    this.updateUserLocation(uid)
    this.getProfiles(uid)
  }

  getProfiles = async (uid) => {
    const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
    const userLocation = await geoFireRef.get(uid)
    console.log('userLocation', userLocation)
    const geoQuery = geoFireRef.query({
      center: userLocation,
      radius: 10,
    })
    geoQuery.on('key_entered', (key,location, distance) => {
      console.log(key + ' at ' + location + ' is ' + distance + 'km from the center')
    })
  }

  updateUserLocation = async (uid) => {
    const { Permissions, Location } = Expo
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false })
      // const {latitude, longitude} = location.coords
      const latitude = 37.39239
      const longitude = -122.09072
      const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
      geoFireRef.set(uid, [latitude, longitude])
      console.log('Permission Granted', location)
    } else {
      console.log('Permission Denied')
    }
  }

  nextCard = () => {
    this.setState({ profileIndex: this.state.profileIndex + 1 })
  }

  render() {
    const { profileIndex } = this.state
    return (
      <View style={{ flex: 1 }}>
        {this.state.profiles.slice(profileIndex, profileIndex + 3).reverse().map((profile) => {
          return (
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



//Demo Data

// const profiles = [
//   {
//     id: '190444725743',
//     name: 'Candice',
//     birthday: '10/18/2010',
//     bio: 'Husky',
//   },
//   {
//     id: '186534877553',
//     name: 'Alessandra',
//     birthday: '1/10/2014',
//     bio: 'Dachshund',
//   },
//   {
//     id: '1637993149777250',
//     name: 'Miranda',
//     birthday: '12/12/2012',
//     bio: 'Chow Chow',
//   },
//   {
//     id: '100009116132192',
//     name: 'Alissa',
//     birthday: '2/11/2017',
//     bio: 'Shetland Sheepdog',
//   },
//   {
//     id: '100013626468806',
//     name: 'Behati',
//     birthday: '3/23/2016',
//     bio: 'Bearded Collie',
//   },
//   {
//     id: '100015219160278',
//     name: 'Rosie',
//     birthday: '9/4/2015',
//     bio: 'Corgi',
//   },
//   {
//     id: '100005544228878',
//     name: 'Kendall',
//     birthday: '8/17/2014',
//     bio: 'Japanese Chin',
//   },
// ]

