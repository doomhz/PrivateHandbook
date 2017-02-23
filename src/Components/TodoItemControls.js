import React from 'react'
import {toDoListStyles} from '../lib/Styles'
import {View, TouchableHighlight, Text} from 'react-native'

const TodoItemControls = (props)=>
  <View style={toDoListStyles.rowBack}>
    <View></View>
    <TouchableHighlight
      onPress={()=> {
        props.rowMap[`${props.secId}${props.rowId}`].closeRow()
        props.onDeleteTodo()
      }}
      style={toDoListStyles.deleteButton}
    >
      <Text
        style={toDoListStyles.deleteButtonText}
      >
        Delete
      </Text>
    </TouchableHighlight>
  </View>

export default TodoItemControls