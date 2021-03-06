import * as firebase from 'firebase'
import { StackNavigator } from 'react-navigation'
import Home from './screens/home'
import Login from './screens/login'
import Chat from './screens/chat'

const firebaseConfig = {
  apiKey: "AIzaSyDU-nm14gcgIny0wOc-mh4OORHaS1vAzDo",
  databaseURL: "https://barkr-62548.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

const RouteConfigs = {
  Login: {screen: Login},
  Home: {screen: Home},
  Chat: {screen: Chat},
}

const StackNavigatorConfig = {
  headerMode: 'none'
}

export default StackNavigator(RouteConfigs, StackNavigatorConfig)