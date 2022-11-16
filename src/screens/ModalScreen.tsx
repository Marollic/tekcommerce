import { View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base'


const ModalScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView>

      <TouchableOpacity
        onPress={navigation.goBack}
        style={{ position: 'absolute', top: 5, marginBottom: 5, right: 5 }}
      >
        <Icon name='closecircle' type='antdesign' />
      </TouchableOpacity>


      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <Icon name='pluscircle' type='antdesign' />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='minuscircle' type='antdesign' />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default ModalScreen