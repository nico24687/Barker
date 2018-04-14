import React, {Component} from 'react'
import {View,} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import * as firebase from 'firebase'

export default class Chat extends Component{
  state ={
    messages: [],
    user: this.props.navigation.state.params.user,
    profile: this.props.navigation.state.params.profile,
  }
  componentWillMount(){
    const {user, profile} = this.state
    this.chatID = user.uid > profile.uid ? user.uid + '-' + profile.uid : profile.uid + '-' + user.uid
    this.watchChat()
  }
  watchChat = () => {
    firebase.database().ref('messages').child(this.chatID).on('value', snap => {
      let messages = []
      snap.forEach(message => {
        messages.push(message.val())
      })
      this.setState({messages})
    })
  }
  onSend = (message) => {
    firebase.database().ref('messages').child(this.chatID)
      .push({
        ...message[0],
        createdAt: new Date().getTime(),
      })
  }
  render(){
    return(
      <GiftedChat
        messages={this.state.messages}
        user={{_id: this.state.user.uid}}
        onSend={this.onSend}
      />
    )
  }
}


