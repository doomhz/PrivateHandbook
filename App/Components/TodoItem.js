import React from 'react'
import {toDoListStyles} from '../lib/Styles'
import {View, TouchableHighlight, Text} from 'react-native'
import IconAwesome from 'react-native-vector-icons/FontAwesome'

const TodoItem = (props)=>
  <TouchableHighlight
    onPress={props.onToggle}
    style={toDoListStyles.rowFront}
    underlayColor="#FFF"
  >
    <View
      style={toDoListStyles.todoItemWrapper}
    >
      <IconAwesome
        name={props.todo.status === 'completed' ? 'check-square-o' : 'square-o'}
        size={26}
        color={props.todo.status === 'completed' ? '#AAA' : '#555'}
      />
      <Text
        style={props.todo.status === 'completed' ? toDoListStyles.todoItemTextCompleted : toDoListStyles.todoItemText}
      >
        {props.todo.title}
      </Text>
    </View>
  </TouchableHighlight>

export default TodoItem