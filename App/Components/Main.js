import React from 'react'

import {
  View, Animated
} from 'react-native';
import {
  Container, Content,
  Grid, Col, Row, Text,
  Card, CardItem,
  Header, Title,
  Button, Icon,
  InputGroup, Input
} from 'native-base';
import Modal from 'react-native-modalbox';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE, TYPE_DELETE
} from '../helpers/Constants.js'
import {
  syncUserTodos, getTodosByStatus
} from '../helpers/TodoStorage'
import {
  loadCurrentUser, signOut, registerAuthStateChangeEvent
} from '../helpers/Auth'
import TodoStorage from '../helpers/TodoStorage'
import {
  mainStyles
} from '../helpers/Styles'


class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
      todos: [],
      listOpacity: new Animated.Value(0),
      showQuickAdd: false,
      quickAddType: "",
      addTodoValue: ""
    }
  }
  componentWillReceiveProps(nextProps){
    this.loadActiveTodos()
  }
  componentDidMount() {
    this.loadCurrentUser()
    registerAuthStateChangeEvent(()=> this.loadCurrentUser())
    this.loadActiveTodos()
    Animated.timing(this.state.listOpacity, {
      toValue: 1,
      duration: 250,
    }).start()
  }
  loadActiveTodos(){
    return getTodosByStatus("active")
    .then((todos)=> {
      this.setState({
        todos: todos
      })
      return todos
    })
  }
  loadCurrentUser(){
    loadCurrentUser().then((userData)=> this.setState({user: userData}))
  }
  goToList(listName){
    this.props.navigator.push({
      id: 'ToDoList',
      passProps: {
        listName: listName
      }
    })
  }
  toggleQuickAdd(type){
    this.setState({
      showQuickAdd: !this.state.showQuickAdd,
      quickAddType: type
    })
  }
  addTodo(todo = {}){
    if (!todo.title) todo.title = this.state.addTodoValue
    todo.type = this.state.quickAddType
    return TodoStorage.addTodo(todo)
    .then(()=> {
      this.loadActiveTodos()
      this.setState({
        quickAddType: "",
        addTodoValue: ""
      })
    })
  }
  handleQuickAdd(){
    if (!this.state.addTodoValue) return
    this.addTodo()
    .then(()=> this.toggleQuickAdd())
  }
  signOut(){
    let afterLogOut = ()=> this.setState({user: null}) || alert("Logged out!")
    signOut().then(afterLogOut).catch(afterLogOut)
  }
  sync(){
    if (!this.state.user) return this.props.navigator.push({id: "Login"})
    syncUserTodos(this.state.user.uid)
    .then(()=> alert(`Successfully synced for ${this.state.user.email}.`))
    .catch(()=> alert(`Could not sync for ${this.state.user.email}. Please try again.`))
  }
  renderActiveTodos(type){
    let todos = this.state.todos.filter((t)=> t.type === type)
    if (todos.length)
      return (
        <Animated.View style={{opacity: this.state.listOpacity}}>
          {todos.map((t, i)=> {
            return (
              <View key={i} style={mainStyles.todoTextOverview}>
                <IconAwesome
                  name="square-o"
                  size={20}
                  color="#555"
                  style={{paddingTop: 2}}
                />
                <Text style={mainStyles.todoTextOverviewText} numberOfLines={1}>{t.title}</Text>
              </View>
            )
          })}
        </Animated.View>
      )
    return <View></View>
  }
  renderCard(type, opts){
    return (
      <Card style={opts.style}>
        <CardItem
          header
        >
          <Text>{type}</Text>
          <Button
            transparent
            onPress={()=> this.toggleQuickAdd(type)}
            style={{height: 19}}
          >
            <IconAwesome
              name='plus-circle'
              style={{fontSize: 19, color: "#AAA"}}
            />
          </Button>
        </CardItem>
        <CardItem
          button
          onPress={()=> this.goToList(type)}
          style={mainStyles.cardItem}
        >
          {this.renderActiveTodos(type)}
        </CardItem>
      </Card>
    )
  }
  renderQuickAddModal() {
    if (this.state.showQuickAdd) return (
      <Modal
        backdropPressToClose={false}
        isOpen={true}
        startOpen={true}
        swipeToClose={false}
        backdrop={true}
      >
        <View style={mainStyles.quickAddModalContent}>
          <InputGroup borderType='regular' style={mainStyles.quickAddForm}>
            <Input
              onChange={(event)=> this.setState({addTodoValue: event.nativeEvent.text})}
              onSubmitEditing={()=> this.handleQuickAdd()}
              value={this.state.addTodoValue}
              placeholder={`Add ${this.state.quickAddType.toUpperCase()} task`}
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
              autoFocus={true}
              returnKeyLabel="next"
            />
          </InputGroup>
          <Button
            success
            block
            style={mainStyles.quickAddButton}
            onPress={()=> this.handleQuickAdd()}
          >
            Add
          </Button>
          <Button
            block
            style={mainStyles.quickAddButton}
            onPress={()=> this.toggleQuickAdd()}
          >
            Close
          </Button>
        </View>
      </Modal>
    )
    return null
  }
  render() {
    return (
      <Container style={{backgroundColor: "#fff"}}>
        <Header>
          <Button
            transparent
            onPress={()=> this.signOut()}
          >
            <Icon name='ios-power' />
          </Button>
          <Title>Private Handbook</Title>
          <Button
            transparent
            onPress={()=> this.sync()}
          >
            <Icon name='ios-sync' />
          </Button>
        </Header>
        <Content contentContainerStyle={{flex: 1, paddingBottom: 5, paddingTop: 5}}>
          <Grid>
            <Row style={mainStyles.row}>
              <Col style={mainStyles.colLeft}>                
                {this.renderCard(TYPE_DO, {style: mainStyles.cardLeftTop})}
              </Col>
              <Col style={mainStyles.colRight}>
                {this.renderCard(TYPE_DECIDE, {style: mainStyles.cardRightTop})}
              </Col>
            </Row>
            <Row style={mainStyles.row}>
              <Col style={mainStyles.colLeft}>
                {this.renderCard(TYPE_DELEGATE, {style: mainStyles.cardLeftBottom})}
              </Col>
              <Col style={mainStyles.colRight}>
                {this.renderCard(TYPE_DELETE, {style: mainStyles.cardRightBottom})}
              </Col>
            </Row>
          </Grid>
          {this.renderQuickAddModal()}
        </Content>
      </Container>
    );
  }
};

module.exports = Main;