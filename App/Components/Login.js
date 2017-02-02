import React from 'react'
import {
  Container, Content,
  Header, Title,
  List, ListItem,
  InputGroup, Icon, Input,
  Button
} from 'native-base';
import {
  login, signup
} from '../helpers/Auth'
import {
  loginStyles
} from '../helpers/Styles'

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  login(){
    if (!this.state.email || !this.state.password) return
    login(this.state.email, this.state.password)
    .then(()=> this.goBack())
    .catch((error)=> alert(error.message))
  }
  signup(){
    if (!this.state.email || !this.state.password) return
    signup(this.state.email, this.state.password)
    .then(()=> this.goBack())
    .catch((error)=> alert(error.message))
  }
  goBack(){
    this.props.navigator.pop();
  }
  render(){
    return (
      <Container style={{backgroundColor: "#fff"}}>
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
          <List>
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
            <ListItem>
              <Button
                onPress={()=> this.signup()}
                block
                primary
              >
                Sign Up
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onPress={()=> this.login()}
                block
                info
              >
                Login
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
};

module.exports = Login;