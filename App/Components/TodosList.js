import React from 'react'
import {
  ListView,
  View, TouchableHighlight,
  Text, InteractionManager,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Content,
  Header, Title,
  List, ListItem,
  InputGroup, Icon, Input,
  Button, CheckBox
} from 'native-base'
import {
  SwipeListView
} from 'react-native-swipe-list-view'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import {
  toDoListStyles
} from '../lib/Styles'
import {
  TODO_STATUS_ACTIVE, TODO_STATUS_COMPLETED
} from '../lib/phbw/src/constants'
import {loadTodos, addTodo, deleteTodo, updateTodo} from '../lib/phbw/src/store/todos/actions'
import {getTodosByType} from '../lib/phbw/src/store/todos/selectors'

class TodosList extends React.Component{
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      addTodoValue: ''
    }
  }
  componentDidMount() {
    this.props.dispatch(loadTodos({sync: true}))
  }
  toggleTodo(todo){
    const newStatus = todo.status === TODO_STATUS_ACTIVE ? TODO_STATUS_COMPLETED : TODO_STATUS_ACTIVE
    const newTodo = Object.assign({}, todo, {status: newStatus})
    this.props.dispatch(updateTodo(newTodo, {sync: true}))
  } 
  addTodo(todo = {}){
    if (!todo.title) todo.title = this.state.addTodoValue
    if (!todo.title) return
    todo.type = this.props.type
    this.props.dispatch(addTodo(todo, {sync: true}))
    this.setState({addTodoValue: ''})
  }
  deleteTodo(todo){
    this.props.dispatch(deleteTodo(todo, {sync: true}))
  }
  goBack(){
    this.props.navigator.pop()
  }
  showInfo(infoName){
    this.props.navigator.push({
      id: 'Info',
      passProps: {
        infoName: infoName
      }
    })
  }
  renderTodo(todo){
    return (
      <TouchableHighlight
        onPress={()=> this.toggleTodo(todo)}
        style={toDoListStyles.rowFront}
        underlayColor="#FFF"
      >
        <View
          style={toDoListStyles.todoItemWrapper}
        >
          <IconAwesome
            name={todo.status === 'completed' ? 'check-square-o' : 'square-o'}
            size={26}
            color={todo.status === 'completed' ? '#AAA' : '#555'}
          />
          <Text
            style={todo.status === 'completed' ? toDoListStyles.todoItemTextCompleted : toDoListStyles.todoItemText}
          >
            {todo.title}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
  renderTodoControls(todo, secId, rowId, rowMap){
    return (
      <View style={toDoListStyles.rowBack}>
        <View></View>
        <TouchableHighlight
          onPress={()=> {
            rowMap[`${secId}${rowId}`].closeRow()
            this.deleteTodo(todo)
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
    )
  }
  render() {
    let listView = null
    if (!this.props.todos) {
      listView = <View></View>
    } else if (this.props.todos.length > 0) {
      listView = (
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.props.todos)}
          renderRow={this.renderTodo.bind(this)}
          renderHiddenRow={this.renderTodoControls.bind(this)}
          disableRightSwipe
          rightOpenValue={-75}
          style={toDoListStyles.todoList}
        />
      )
    } else {
      listView = <Text style={toDoListStyles.allDoneText}>All done!</Text>
    }
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header>
          <Button
            transparent
            onPress={()=> this.goBack()}
          >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>{this.props.type.toUpperCase()}</Title>
          <Button
            transparent
            onPress={()=> this.showInfo(this.props.type)}
          >
          <IconAwesome
              name='info-circle'
              style={{fontSize: 19, color: '#1981fb'}}
            />
          </Button>
        </Header>
        <Content>
          {listView}
          <InputGroup borderType='regular' style={toDoListStyles.addTodoBox}>
            <Icon name='ios-add' style={{color:'#384850'}}/>
            <Input
              onChange={(event) => this.setState({addTodoValue: event.nativeEvent.text})}
              onSubmitEditing={() => this.addTodo()}
              placeholder={'Add todo'}
              value={this.state.addTodoValue}
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
              returnKeyLabel="next"
            />
          </InputGroup>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps)=> ({
  todos: getTodosByType(state, ownProps.listName),
  type: ownProps.listName
})

export default connect(mapStateToProps)(TodosList)