import React from 'react'
import { connect } from 'react-redux'
import {
  Container, Content,
  Header, Title,
  InputGroup, Icon, Input,
  Button
} from 'native-base'
import { InteractionManager, Animated } from 'react-native'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import TodosSwipeList from './TodosSwipeList'
import {toDoListStyles} from '../lib/Styles'
import {
  TODO_STATUS_ACTIVE, TODO_STATUS_COMPLETED
} from '../lib/phbw/src/constants'
import {
  loadTodos, addTodo, deleteTodo, updateTodo
} from '../lib/phbw/src/store/todos/actions'
import {getTodosByType} from '../lib/phbw/src/store/todos/selectors'

class Todos extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      addTodoValue: '',
      listOpacity: new Animated.Value(0)
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(loadTodos({sync: true}))
      Animated.timing(this.state.listOpacity, {
        toValue: 1,
        duration: 100
      }).start()
    })
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
  render() {
    return (
      <Container style={toDoListStyles.content}>
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
              style={toDoListStyles.infoButton}
            />
          </Button>
        </Header>
        <Content>
          <Animated.View style={{opacity: this.state.listOpacity}}>
            <TodosSwipeList
              todos={this.props.todos}
              dataSource={this.ds}
              onToggle={this.toggleTodo.bind(this)}
              onDelete={this.deleteTodo.bind(this)}
            />
            <InputGroup borderType='regular' style={toDoListStyles.addTodoBox}>
              <Icon name='ios-add' style={toDoListStyles.addButton}/>
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
          </Animated.View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps)=> ({
  todos: getTodosByType(state, ownProps.listName),
  type: ownProps.listName
})

export default connect(mapStateToProps)(Todos)