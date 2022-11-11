import { View, StyleSheet, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgBackground from '../component/ImgBackground';

export type SplashNavigationProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const img = require('../images/background_login.png');
const lgo = require('../images/Logo.png')

const SplashScreen = ({ navigation }: SplashNavigationProps) => {
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then((value) => navigation.replace(value === null ? 'Auth' : 'Main'));
    }, 5000)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ImgBackground source={img}
        resizeMode={'cover'}
        style={styles.image}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.view}>
            <Image source={lgo} resizeMode='center' style={{margin:-30}}  />
            <ActivityIndicator
              animating={animating}
              color={'#000000'}
              size={'large'}
              style={styles.activityIndicator}
            />
          </View>
        </SafeAreaView>
      </ImgBackground>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 50,
  },
});