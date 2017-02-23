import React from 'react'
import {mainStyles} from '../lib/Styles'
import Modal from 'react-native-modalbox'
import {View} from 'react-native'
import {Button, InputGroup, Input} from 'native-base'

const QuickAddModal = (props)=> {
  if (props.show) {
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
              onChange={props.onInputChange}
              onSubmitEditing={props.onSubmit}
              value={props.value}
              placeholder={props.placeholder}
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
            onPress={props.onSubmitClick}
          >
            Add
          </Button>
          <Button
            block
            style={mainStyles.quickAddButton}
            onPress={props.onCloseClick}
          >
            Close
          </Button>
        </View>
      </Modal>
    )
  }
  return null
}

export default QuickAddModal