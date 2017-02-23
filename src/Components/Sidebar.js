import React from 'react'
import { connect } from 'react-redux'
import {
  Container, Content, Text,
  Header, Title, ListItem,
  Icon, Button
} from 'native-base'
import { sidebarStyles } from '../lib/Styles'
import * as authSelectors from '../lib/phbw/src/store/auth/selectors'
import { logout } from '../lib/phbw/src/store/auth/actions'
import { syncTodos } from '../lib/phbw/src/store/todos/actions'

const Sidebar = ({ navigator, currentUser, dispatch, close })=>
  <Container style={sidebarStyles.container}>
    <Header>
      <Title>Menu</Title>
    </Header>
    <Content contentContainerStyle={{flex: 1, paddingBottom: 5, paddingTop: 5}}>
      {!currentUser &&
        <ListItem>
          <Button transparent onPress={()=> navigator.push({id: 'Login'}) || close()}>
            <Icon name='ios-person' />
            <Text>Log in</Text>
          </Button>
        </ListItem>
      }
      {currentUser &&
        <ListItem>
          <Button transparent onPress={()=> dispatch(logout())}>
            <Icon name='ios-power' />
            <Text>Log out</Text>
          </Button>
        </ListItem>
      }
      {currentUser &&
        <ListItem>
          <Button transparent onPress={()=> dispatch(syncTodos())}>
            <Icon name='ios-sync' />
            <Text>Sync</Text>
          </Button>
        </ListItem>
      }
    </Content>
  </Container>

const mapStateToProps = (state)=> ({
  currentUser: authSelectors.getCurrentUser(state)
})

export default connect(mapStateToProps)(Sidebar)