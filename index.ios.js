/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './App/lib/phbw/src/config/store'
import { loadCurrentUser } from './App/lib/phbw/src/store/auth/actions'
import Main from './App/Components/Main'
import Login from './App/Components/Login'
import TodosList from './App/Components/TodosList'
import Info from './App/Components/Info'


const store = configureStore()
store.dispatch(loadCurrentUser())

class PrivateHandbook extends React.Component {
  renderScene(route, navigator){
    switch (route.id) {
      case 'Login':
        return <Login navigator={navigator} {...route.passProps} />
      case 'TodosList':
        return <TodosList navigator={navigator} {...route.passProps} />
      case 'Info':
        return <Info navigator={navigator} {...route.passProps} />
      default:
        return <Main navigator={navigator} {...route.passProps} />
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Navigator
          ref={(ref) => {
            this._navigator = ref
          }}
          initialRoute={{
            title: 'Brush My Life',
            id: 'main'
          }}
          renderScene={this.renderScene}
          style={styles.container}
        />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

AppRegistry.registerComponent('PrivateHandbook', () => PrivateHandbook)