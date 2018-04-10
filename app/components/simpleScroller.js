import React, {Component} from 'react'
import {View, StyleSheet, Animated, PanResponder} from 'react-native'

export default class SimpleScroller extends Component {
  componentWillMount(){
    this.pan = new Animated.Value(0)


    this.scrollResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan },
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.pan, {
          toValue: 0,
        }).start()
      },
    })

  }
  render(){
    const animatedStyles = {
      transform: [
        { translateX: this.pan },
      ],
    }
    return(
      <Animated.View 
        style={[styles.scroller, animatedStyles]}
        {...this.scrollResponder.panHandlers}>
      {this.props.screen}
      </Animated.View>
    )
  }
}

  const styles = StyleSheet.create({
    scroller: {
      flex: 1,
      backgroundColor: 'blue',
    },
  })