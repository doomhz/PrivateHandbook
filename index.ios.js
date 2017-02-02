/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';
import Main from './App/Components/Main';
import Login from './App/Components/Login';
import ToDoList from './App/Components/ToDoList';
import Info from './App/Components/Info';

class PrivateHandbook extends React.Component {
  renderScene(route, navigator){
    switch (route.id) {
      case 'Login':
        return <Login navigator={navigator} {...route.passProps} />;
      case 'ToDoList':
        return <ToDoList navigator={navigator} {...route.passProps} />;
      case 'Info':
        return <Info navigator={navigator} {...route.passProps} />;
      default:
        return <Main navigator={navigator} {...route.passProps} />;
    }
  }
  render() {
    return (
      <Navigator
        ref={(ref) => {
          this._navigator = ref;
        }}
        initialRoute={{
          title: "Brush My Life",
          id: "main"
        }}
        renderScene={this.renderScene}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
});

AppRegistry.registerComponent('PrivateHandbook', () => PrivateHandbook);