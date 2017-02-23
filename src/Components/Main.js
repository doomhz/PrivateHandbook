import React from 'react'
import { connect } from 'react-redux'
import {
  Container, Content,
  Grid, Col, Row, Text,
  Header, Title,
  Button, Icon, Drawer
} from 'native-base'
import TodoCard from './TodoCard'
import QuickAddModal from './QuickAddModal'
import Sidebar from './Sidebar'
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE, TYPE_DELETE,
  TODO_STATUS_ACTIVE
} from '../lib/phbw/src/constants'
import {mainStyles} from '../lib/Styles'
import {loadTodos, addTodo} from '../lib/phbw/src/store/todos/actions'
import {getGroupedTodosByTypeAndStatus} from '../lib/phbw/src/store/todos/selectors'
import * as authSelectors from '../lib/phbw/src/store/auth/selectors'
import { loadCurrentUser } from '../lib/phbw/src/store/auth/actions'

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
    this.props.dispatch(loadCurrentUser())
    this.props.dispatch(loadTodos({sync: true}))
  }
  goToList(listName){
    this.props.navigator.push({
      id: 'Todos',
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
  render() {
    return (
      <Drawer
        ref={c => { this.drawer = c }}
        content={
          <Sidebar
            navigator={this.props.navigator}
            close={()=> this.drawer.close()}
          />
        }
        type="overlay"
        disabled={this.state.sideMenuDisabled}
        tapToClose={true}
      >
        <Container style={{backgroundColor: '#fff'}}>
          <Header>
            <Button transparent onPress={()=> this.drawer.open()}>
              <Icon name='ios-menu' />
            </Button>
            <Title>Private Handbook</Title>
          </Header>
          <Content contentContainerStyle={{flex: 1, paddingBottom: 5, paddingTop: 5}}>
            <Grid>
              <Row style={mainStyles.row}>
                <Col style={mainStyles.colLeft}>                
                  <TodoCard
                    type={TYPE_DO}
                    style={mainStyles.cardLeftTop}
                    onAddTodoClick={()=> this.toggleQuickAdd(TYPE_DO)}
                    onClick={()=> this.goToList(TYPE_DO)}
                    todos={this.props.todos[TYPE_DO]}
                  />
                </Col>
                <Col style={mainStyles.colRight}>
                  <TodoCard
                    type={TYPE_DECIDE}
                    style={mainStyles.cardRightTop}
                    onAddTodoClick={()=> this.toggleQuickAdd(TYPE_DECIDE)}
                    onClick={()=> this.goToList(TYPE_DECIDE)}
                    todos={this.props.todos[TYPE_DECIDE]}
                  />
                </Col>
              </Row>
              <Row style={mainStyles.row}>
                <Col style={mainStyles.colLeft}>
                  <TodoCard
                    type={TYPE_DELEGATE}
                    style={mainStyles.cardLeftBottom}
                    onAddTodoClick={()=> this.toggleQuickAdd(TYPE_DELEGATE)}
                    onClick={()=> this.goToList(TYPE_DELEGATE)}
                    todos={this.props.todos[TYPE_DELEGATE]}
                  />
                </Col>
                <Col style={mainStyles.colRight}>
                  <TodoCard
                    type={TYPE_DELETE}
                    style={mainStyles.cardRightBottom}
                    onAddTodoClick={()=> this.toggleQuickAdd(TYPE_DELETE)}
                    onClick={()=> this.goToList(TYPE_DELETE)}
                    todos={this.props.todos[TYPE_DELETE]}
                  />
                </Col>
              </Row>
            </Grid>
            <QuickAddModal
              show={this.state.showQuickAdd}
              onInputChange={(event)=> this.setState({
                addTodoValue: event.nativeEvent.text
              })}
              onSubmit={()=> this.handleQuickAdd()}
              value={this.state.addTodoValue}
              placeholder={
                `Add ${this.state.quickAddType ? this.state.quickAddType.toUpperCase() : ''} task`
              }
              onSubmitClick={()=> this.handleQuickAdd()}
              onCloseClick={()=> this.toggleQuickAdd()}
            />
          </Content>
        </Container>
      </Drawer>
    )
  }
}

const mapStateToProps = (state)=> ({
  currentUser: authSelectors.getCurrentUser(state),
  todos: getGroupedTodosByTypeAndStatus(state, TODO_STATUS_ACTIVE)
})

export default connect(mapStateToProps)(Main)