import React, {Component} from 'react'
import {View, StyleSheet, Animated, PanResponder, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

export default class SimpleScroller extends Component {
  componentWillMount(){
    this.pan = new Animated.Value(0)


    this.scrollResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.pan.setOffset(this.pan._value)
        this.pan.setValue(0)
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.pan },
      ]),
      onPanResponderRelease: () => {
        this.pan.flattenOffset()
        const move = Math.round(this.pan._value / width) * width 
        Animated.spring(this.pan, {
          toValue: move,
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
    const scrollerWidth = this.props.screens.length * width 
    return(
      <Animated.View 
        style={[styles.scroller, animatedStyles, {width: scrollerWidth}]}
        {...this.scrollResponder.panHandlers}>
        {this.props.screens.map((screen, i) => <View key={i} style={{width, height}}>{screen}</View>)}
      </Animated.View>
    )
  }
}

  const styles = StyleSheet.create({
    scroller: {
      flex: 1,
      backgroundColor: 'blue',
      flexDirection: 'row',
    },
  })