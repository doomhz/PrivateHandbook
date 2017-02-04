import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  View, Text
} from 'native-base'

const BulletList = (props)=> {
  if (!props.items.length) return <View></View>
  let style = StyleSheet.create({
    li: Object.assign({}, styleSheet.listItem, props.style)
  })
  let listItems = props.items.map((item, i)=> {
    return (
      <Text
        key={i}
        style={style.li}
      >
        &#8226; {item}
      </Text>
    )
  })
  return <View>{listItems}</View>
}

BulletList.defaultProps = {
  items: [],
  style: {}
}

BulletList.propTypes = {
  items: React.PropTypes.array,
  style: React.PropTypes.object
}

const Paragraph = (props)=> {
  let style = StyleSheet.create({
    p: Object.assign({}, styleSheet.paragraphText, props.style)
  })
  return (
    <Text
      style={style.p}
    >
      {props.children}
    </Text>
  )
}

Paragraph.defaultProps = {
  style: {}
}

BulletList.propTypes = {
  style: React.PropTypes.object
}

const styleSheet = {
  listItem: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'justify'
  },
  paragraphText: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'justify'
  }
}

export { BulletList, Paragraph }