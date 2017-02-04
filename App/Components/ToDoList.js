import React from 'react'
import {
  ListView,
  View, TouchableHighlight,
  Text, InteractionManager,
  Animated
} from 'react-native';
import {
  Container, Content,
  Header, Title,
  List, ListItem,
  InputGroup, Icon, Input,
  Button, CheckBox
} from 'native-base';
import {
  SwipeListView
} from 'react-native-swipe-list-view';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import TodoStorage from '../helpers/TodoStorage'
import {
  toDoListStyles
} from '../lib/Styles'

class ToDoList extends React.Component{
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      todos: null,
      addTodoValue: "",
      listOpacity: new Animated.Value(0)
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.updateTodos()
      Animated.timing(this.state.listOpacity, {
        toValue: 1,
        duration: 100,
      }).start()
    })
  }
  updateTodos(){
    return TodoStorage.getTodosByType(this.props.listName)
    .then((todos)=> {
      this.setState({
        todos: this.ds.cloneWithRows(todos)
      })
      return todos
    })
  }
  toggleTodo(todo){
    todo.status = todo.status === "active" ? "completed" : "active"
    TodoStorage.updateTodo(todo)
    .then(()=> {
      this.updateTodos()
    })
  }
  addTodo(todo = {}){
    if (!todo.title) todo.title = this.state.addTodoValue
    todo.type = this.props.listName
    TodoStorage.addTodo(todo)
    .then(()=> {
      this.updateTodos()
      this.setState({addTodoValue: ""})
    })
  }
  deleteTodo(todo){
    TodoStorage.deleteTodo(todo)
    .then(()=> {
      this.updateTodos()
    })
  }
  goBack(){
    this.props.navigator.pop();
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
            name={todo.status === "completed" ? "check-square-o" : "square-o"}
            size={26}
            color={todo.status === "completed" ? "#AAA" : "#555"}
          />
          <Text
            style={todo.status === "completed" ? toDoListStyles.todoItemTextCompleted : toDoListStyles.todoItemText}
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
    if (!this.state.todos) {
      listView = <View></View>
    } else if (this.state.todos.getRowCount() > 0) {
      listView = (
        <SwipeListView
          dataSource={this.state.todos}
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
      <Container style={{backgroundColor: "#fff"}}>
        <Header>
          <Button
            transparent
            onPress={()=> this.goBack()}
          >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>{this.props.listName.toUpperCase()}</Title>
          <Button
            transparent
            onPress={()=> this.showInfo(this.props.listName)}
          >
          <IconAwesome
              name='info-circle'
              style={{fontSize: 19, color: "#1981fb"}}
            />
          </Button>
        </Header>
        <Content>
          <Animated.View style={{opacity: this.state.listOpacity}}>
            {listView}
            <InputGroup borderType='regular' style={toDoListStyles.addTodoBox}>
              <Icon name='ios-add' style={{color:'#384850'}}/>
              <Input
                onChange={(event) => this.setState({addTodoValue: event.nativeEvent.text})}
                onSubmitEditing={() => this.addTodo()}
                placeholder={"Add todo"}
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
    );
  }
};

module.exports = ToDoList