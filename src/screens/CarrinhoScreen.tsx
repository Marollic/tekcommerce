import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const CarrinhoScreen = ({navigation}:any) => {
  useEffect(() => { navigation.setOptions({ headerShown: false }) }, [])
  return (
    <View>
      <Text>CarrinhoScreen</Text>
    </View>
  )
}

export default CarrinhoScreen