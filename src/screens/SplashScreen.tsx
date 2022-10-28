import { View, StyleSheet, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgBackground from '../component/ImgBackground';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const img = require('../images/background_login.png');
const lgo = require('../images/Logo.png')

const SplashScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then((value) => navigation.replace(value === null ? 'Auth' : 'Main'));
    }, 5000)
  }, [])

  return (
    <View style={styles.view}>
      <ImgBackground source={img}
        resizeMode={'cover'}
        style={styles.image}>
        <SafeAreaView style={{ flex: 12, justifyContent: 'center', height: '10%' }}>
          <Image source={lgo} style={{ margin: 30 }} />
        </SafeAreaView>
        <View style={styles.Middle}>
          <ActivityIndicator animating={animating} color={'#FFFFFF'} size={'large'} />
        </View>
      </ImgBackground>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  Middle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 100,
  },
});