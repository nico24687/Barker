import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  PanResponder,
  Animated,
} from 'react-native'

const fbImage = 'https://graph.facebook.com/1637993149777250/picture?height=500'

export default class App extends Component {
  componentWillMount() {
    this.pan = new Animated.ValueXY()

    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan.x, dy: this.pan.y },
      ]),
      onPanResponderRelease: (e, gesture) => console.log('Released', gesture.moveY),
    })
  }

  render() {
    const rotateCard = this.pan.x.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: ['-10deg', '0deg', '10deg'],
    })


    const animatedStyle = {
      transform: [
        { translateX: this.pan.x },
        { translateY: this.pan.y },
        {rotate: rotateCard},
      ],
    }

    return (
      <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[styles.card, animatedStyle]}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: fbImage }}
        />
        <View style={{ margin: 20 }}>
          <Text stlye={{ fontSize: 20 }}>Miranda, 6</Text>
          <Text style={{ fontSize: 15, color: 'darkgrey' }}>Chow Chow </Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 10,
    marginTop: 100,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
})