import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base'
import { Input, Button } from 'native-base'


const ModalScreen = ({ navigation, route }: any) => {

  const { params: { product } }: any = route;
  useEffect(() => {
    navigation.setOptions({
      title: `${product.title}`,
      alignSelf: 'center',
      headerTintColor: '#FFFF',
      headerStyle: {
        backgroundColor: '#9921E8'
      }
    })
  }, []);
  const [input, setInput] = useState(1);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%' }}>
        <Image
          source={{ uri: product.thumbnail }}
          resizeMode='cover'
          style={{
            height: 200,
            width: '100%',
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
            <Icon name='minuscircle' type='antdesign' size={32} color='#9921E8' />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 6, justifyContent: 'flex-end', borderWidth: 0 }}>
          <Input
            style={{
              fontSize: 18,
              borderWidth: 1,
              textAlign: 'center',
              borderColor: '#9921E8',
              color: '#9921E8',
              borderRadius: 15,
            }}
            placeholder='quantidade'
            onChangeText={() => setInput}
            value={`${input}`}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }} >
          <TouchableOpacity onPress={() => { setInput(input >= product.stock ? input : input + 1) }}>
            <Icon name='pluscircle' type='antdesign' size={32} color='#9921E8' />
          </TouchableOpacity>
        </View>
      </View>


      {/* Button */}
      <View style={styles.buttonStyle}>
        <Button
          style={styles.buttonDesign}
        >
          ATUALIZAR DADOS
        </Button>
      </View>


    </View >
  )
}

export default ModalScreen

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    height: '10%',
    justifyContent: 'flex-end',
  },
  buttonDesign: {
    backgroundColor: '#9921E8',
    borderRadius: 0,
    fontSize: 28,
    height: '100%'
  },
})