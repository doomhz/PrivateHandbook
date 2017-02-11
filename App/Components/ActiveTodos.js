import React from 'react'
import {mainStyles} from '../lib/Styles'
import {View} from 'react-native'
import {Text} from 'native-base'
import IconAwesome from 'react-native-vector-icons/FontAwesome'

const ActiveTodos = (props)=> {
  if (!props.todos) {
    return <View></View>
  }
  return (
    <View>
      {props.todos.map((t, i)=> {
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

export default ActiveTodos