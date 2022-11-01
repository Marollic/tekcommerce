import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../screens/SplashScreen';
import DrawerNavigator from './DrawerNavigator';

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    MyModal: undefined;
    Splash: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <RootStack.Navigator initialRouteName='Splash'>
            <RootStack.Group>
                <RootStack.Screen name='Splash' component={SplashScreen} />
            </RootStack.Group>

            <RootStack.Group>
                <RootStack.Screen name='Auth' component={AuthNavigator} />
            </RootStack.Group>

            <RootStack.Group>
                <RootStack.Screen name='Main' component={DrawerNavigator} />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootNavigator;