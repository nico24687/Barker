import React, {Component} from 'react'
import {ListView} from 'react-native'

export default class Matches extends Component{

  state ={
    dataSource: new ListView.DataSource({rowHasChanged: (oldRow, newRow) => oldRow !== newrow })
  }

  render(){
    return(
      <ListView
        style={{flex: 1, backgroundColor: 'red'}}
        dataSource={this.state.dataSource}
      />
    )
  }
}
