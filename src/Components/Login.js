import React from 'react'
import { connect } from 'react-redux'
import {
  Container, Content,
  Header, Title,
  List, ListItem,
  InputGroup, Icon, Input,
  Button, Card, CardItem, Text
} from 'native-base'
import {loginStyles} from '../lib/Styles'
import {
  login, signup, resetLoginErrors, resetSignupErrors
} from '../lib/phbw/src/store/auth/actions'
import * as authSelectors from '../lib/phbw/src/store/auth/selectors'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount(){
    this.props.dispatch(resetSignupErrors())
    this.props.dispatch(resetLoginErrors())
  }
  componentWillReceiveProps(nextProps){
    if (!this.props.currentUser && nextProps.currentUser) {
      this.goBack()
    }
  }
  auth(action){
    if (!this.state.email || !this.state.password) return
    this.props.dispatch(resetSignupErrors())
    this.props.dispatch(resetLoginErrors())
    if (action === 'login') {
      this.props.dispatch(login(this.state))
    }
    if (action === 'signup') {
      this.props.dispatch(signup(this.state))
    }
  }
  goBack(){
    this.props.navigator.pop()
  }
  render(){
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Header>
          <Button
            transparent
            onPress={()=> this.goBack()}
          >
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>Authenticate</Title>
        </Header>
        <Content>
          <List style={loginStyles.list}>
            <ListItem>
              <InputGroup>
                <Icon name='ios-person' />
                <Input
                  placeholder='EMAIL'
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name='ios-unlock' />
                <Input
                  placeholder='PASSWORD'
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </InputGroup>
            </ListItem>
          </List>
          <Button
            onPress={()=> this.auth('signup')}
            block
            primary
            style={loginStyles.authButton}
          >
            Sign Up
          </Button>
          <Button
            onPress={()=> this.auth('login')}
            block
            info
            style={loginStyles.authButton}
          >
            Login
          </Button>
          {this.props.signupError &&
            <Card style={loginStyles.errorCard}>
              <CardItem>                        
                <Text style={loginStyles.errorText}>{this.props.signupError}</Text>
              </CardItem>
            </Card>
          }
          {this.props.loginError &&
            <Card style={loginStyles.errorCard}>
              <CardItem>                        
                <Text style={loginStyles.errorText}>{this.props.loginError}</Text>
              </CardItem>
            </Card>
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state)=> ({
  signupError: authSelectors.getSignupErrors(state),
  loginError: authSelectors.getLoginErrors(state),
  currentUser: authSelectors.getCurrentUser(state)
})

export default connect(mapStateToProps)(Login)