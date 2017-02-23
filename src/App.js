import React from 'react'
import {Navigator} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './lib/phbw/src/config/store'
import { loadCurrentUser } from './lib/phbw/src/store/auth/actions'
import Main from './Components/Main'
import Login from './Components/Login'
import Todos from './Components/Todos'
import Info from './Components/Info'

class App extends React.Component {
  renderScene(route, navigator){
    switch (route.id) {
      case 'Login':
        return <Login navigator={navigator} {...route.passProps} />
      case 'Todos':
        return <Todos navigator={navigator} {...route.passProps} />
      case 'Info':
        return <Info navigator={navigator} {...route.passProps} />
      default:
        return <Main navigator={navigator} {...route.passProps} />
    }
  }
  render() {
    const store = configureStore()
    store.dispatch(loadCurrentUser())
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
          style={{backgroundColor: '#fff'}}
        />
      </Provider>
    )
  }
}

export default App