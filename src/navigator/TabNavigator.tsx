import { View, Text } from 'react-native'
import { Image } from 'native-base'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import HomeScreen from '../screens/HomeScreen';
import ProdutosScreen from '../screens/ProdutosScreen';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import PedidosScreen from '../screens/PedidosScreen';
import NavigationTabHeader from '../component/NavigatorTabHeader';

export type TabStackParamList = {
  Home: undefined;
  Produtos: undefined;
  Carrinho: undefined;
  Pedidos: undefined;
}

const Tab = createBottomTabNavigator<TabStackParamList>();

const lgo = require('../images/Logo_Home.png');

const TabNavigator = () => {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({ headerShown: false })
  // }, []);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#9921E8",
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name == 'Home') {
          return (
            <Icon name="home"
              type='entypo'
              color={focused ? "#9921E8" : "gray"}
            />
          )
        } else if (route.name == 'Produtos') {
          return (
            <Icon name="box"
              type='entypo'
              color={focused ? '#9921E8' : "gray"}
            />
          )
        } else if (route.name == 'Carrinho') {
          return (
            <Icon name="shopping-cart"
              type='entypo'
              color={focused ? '#9921E8' : "gray"}
            />
          )
        } else if (route.name == 'Pedidos') {
          return (
            <Icon name="shop"
              type='entypo'
              color={focused ? '#9921E8' : "gray"}
            />
          )
        }
      }
    })}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
      />
      <Tab.Screen
        name='Produtos'
        component={ProdutosScreen}
      />
      <Tab.Screen
        name='Carrinho'
        options={{
          headerLeft: () => (
            <NavigationTabHeader navigationProps={navigation} />
          ),
        }}
        component={CarrinhoScreen}
      />
      <Tab.Screen
        name='Pedidos'
        component={PedidosScreen}
      />
    </Tab.Navigator>
  )

}

export default TabNavigator