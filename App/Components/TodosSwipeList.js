import React from 'react'
import {toDoListStyles} from '../lib/Styles'
import {SwipeListView} from 'react-native-swipe-list-view'
import {View, ListView} from 'react-native'
import {Text} from 'native-base'
import TodoItem from './TodoItem'
import TodoItemControls from './TodoItemControls'

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const TodosSwipeList = (props)=> {
  if (!props.todos) {
    return <View></View>
  } else if (props.todos.length > 0) {
    return (
      <SwipeListView
        dataSource={dataSource.cloneWithRows(props.todos)}
        renderRow={(todo)=> (
          <TodoItem
            todo={todo}
            onToggle={()=> props.onToggle(todo)}
          />
        )}
        renderHiddenRow={
          (todo, secId, rowId, rowMap)=> (
            <TodoItemControls
              secId={secId}
              rowId={rowId}
              rowMap={rowMap}
              onDeleteTodo={()=> props.onDelete(todo)}
            />
          )
        }
        disableRightSwipe
        rightOpenValue={-75}
        style={toDoListStyles.todoList}
      />
    )
  } else {
    return <Text style={toDoListStyles.allDoneText}>All done!</Text>
  }
}

export default TodosSwipeList