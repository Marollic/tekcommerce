import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import { useNavigation } from '@react-navigation/native'

export type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => navigation.setOptions({ headerShown: false }), [navigation])

    return (
        <AuthStack.Navigator>
            <AuthStack.Group>
                <AuthStack.Screen name='Login' component={LoginScreen} />
                <AuthStack.Screen name='SignUp' component={SignUpScreen} />
            </AuthStack.Group>
        </AuthStack.Navigator>
    )
}

export default AuthNavigator