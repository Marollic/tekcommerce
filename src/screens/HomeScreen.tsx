import { StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, View, Icon, ScrollView } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons'
import Loader from '../component/Loader'
import HomeProductCard from '../component/HomeProductCard'
import { CompositeNavigationProp } from '@react-navigation/native'
import { TabStackParamList } from '../navigator/TabNavigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type HomeScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, 'Home'>, StackNavigationProp<RootStackParamList, 'MyModal'>>

const HomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    setLoading(true);

    fetch('https://tekcommerce.herokuapp.com/api/product', {
      method: 'get',
      headers: {
        //Header Defination
        'Accept':
          'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          setData(responseJson.data)
        } else {
          console.log('Error ao trazer os produtos');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        setData([])
      });

  }, [])

  return (
    <View >

      <Loader loading={loading} />

      <View style={styles.buttonStyle}>

        <View style={styles.emailInput}>
          <Input
            onChangeText={setInput}
            InputRightElement={
              <Icon
                as={<FontAwesome5 name="search" />}
                size="lg"
                m={2}
                _light={{
                  color: "#9921E8",
                }}
                _dark={{
                  color: "#ffffff",
                }}
              />
            }
            variant="outline"
            placeholder="buscar produto..."
            _light={{
              placeholderTextColor: '#9921E8',
            }}
            _dark={{
              placeholderTextColor: '#ffffff',
            }}
            style={{ color: '#000000', fontSize: 12 }}
            autoCapitalize="none"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
        </View>
      </View>
      <ScrollView style={{ margin: 2 }}>
        {data?.filter((item: any) =>
          item.title.includes(input)
        )?.map((item: any) => (<HomeProductCard
          key={item.id}
          thumbnail={item.thumbnail}
          brand={item.brand}
          description={item.description}
          stock={item.stock}
          price={item.price}
        />))}

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  emailInput: {
    marginTop: 10,
    marginRight: 5
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15
  },
});