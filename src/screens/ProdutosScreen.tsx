import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const ProdutosScreen = ({navigation}:any) => {
  useEffect(() => { navigation.setOptions({ headerShown: false }) }, [])
  return (
    <View>
      <Text>ProdutosScreen</Text>
    </View>
  )
}

export default ProdutosScreen