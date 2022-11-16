import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const PedidosScreen = ({navigation}:any) => {
  useEffect(() => { navigation.setOptions({ headerShown: false }) }, [])
  return (
    <View>
      <Text>PedidosScreen</Text>
    </View>
  )
}

export default PedidosScreen