import React from 'react'
import {mainStyles} from '../lib/Styles'
import {Text, Card, CardItem, Button} from 'native-base'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import ActiveTodos from './ActiveTodos'

const TodoCard = (props)=>
  <Card style={props.style}>
    <CardItem
      header
    >
      <Text>{props.type}</Text>
      <Button
        transparent
        onPress={props.onAddTodoClick}
        style={{height: 19}}
      >
        <IconAwesome
          name='plus-circle'
          style={{fontSize: 19, color: '#AAA'}}
        />
      </Button>
    </CardItem>
    <CardItem
      button
      onPress={props.onClick}
      style={mainStyles.cardItem}
    >
      <ActiveTodos todos={props.todos} />
    </CardItem>
  </Card>

export default TodoCard