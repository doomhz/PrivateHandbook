import React from 'react'
import { connect } from 'react-redux'
import {
  View
} from 'react-native'
import {
  Container, Content,
  Grid, Col, Row, Text,
  Card, CardItem,
  Header, Title,
  Button, Icon,
  InputGroup, Input
} from 'native-base'
import Modal from 'react-native-modalbox'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE, TYPE_DELETE,
  TODO_STATUS_ACTIVE
} from '../lib/phbw/src/constants'
import {
  mainStyles
} from '../helpers/Styles'
import {loadTodos, addTodo} from '../lib/phbw/src/store/todos/actions'
import {getGroupedTodosByTypeAndStatus} from '../lib/phbw/src/store/todos/selectors'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showQuickAdd: false,
      quickAddType: null,
      addTodoValue: ''
    }
  }
  componentDidMount() {
    this.props.dispatch(loadTodos({sync: true}))
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
    this.props.dispatch(addTodo(todo, {sync: true}))
    this.setState({quickAddType: '', addTodoValue: ''})
  }
  handleQuickAdd(){
    if (!this.state.addTodoValue) return
    this.addTodo()
    this.toggleQuickAdd()
  }
  renderActiveTodos(type){
    if (!this.props.todos[type]) return <View></View>
    return (
      <View>
        {this.props.todos[type].map((t, i)=> {
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
      </View>
    )
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
              style={{fontSize: 19, color: '#AAA'}}
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
    if (this.state.showQuickAdd) {
      return (
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
    }
    return null
  }
  render() {
    return (
      <Container style={{backgroundColor: '#fff'}}>
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
    )
  }
}

const mapStateToProps = (state)=> ({
  todos: getGroupedTodosByTypeAndStatus(state, TODO_STATUS_ACTIVE)
})

export default connect(mapStateToProps)(Main)