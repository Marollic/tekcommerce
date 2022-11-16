import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base'
import { useRoute } from '@react-navigation/native'
import { Flex, Input } from 'native-base'


const ModalScreen = ({ navigation }: any) => {
  const { params: { product } }: any = useRoute();
  useEffect(() => { navigation.setOptions({ title: `${product.title}`, alignSelf: 'center' }) }, []);
  const [input, setInput] = useState(1);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          source={{ uri: product.thumbnail }}
          resizeMode='contain'
          style={{
            height: 200,
            width: '100%',
            borderRadius: 1,
            alignSelf: 'center',
          }}
        />
      </View>

      <View>
        <Text style={{ fontSize: 24, margin: 20 }}>{product.description}</Text>
        <Text style={{ fontSize: 24, color: 'red', margin: 20 }}>Price: R$ {product.price}</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', margin: 20, alignItems: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => { setInput(input <= 1 ? 0 : input - 1) }}>
            <Icon name='minuscircle' type='antdesign' size={32} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, justifyContent: 'flex-end' }}>
          <Input style={{ fontSize: 18, borderWidth: 1, textAlign: 'center' }} placeholder='quantidade' defaultValue='1' onChangeText={() => setInput} value={`${input}`} />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }} >
          <TouchableOpacity onPress={() => { setInput(input + 1) }}>
            <Icon name='pluscircle' type='antdesign' size={32} />
          </TouchableOpacity>
        </View>
      </View>


    </View >
  )
}

export default ModalScreen