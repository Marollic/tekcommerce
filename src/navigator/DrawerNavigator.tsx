import React, { useLayoutEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import PerfilScreen from '../screens/PerfilScreen';
import TabNavigator, { TabStackParamList } from './TabNavigator';
import { useNavigation } from '@react-navigation/native';
import CustomSideDrawerMenu from '../component/CustomSideDrawerMenu';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';

export type DrawerNavigatorParamList = {
    Perfil: undefined;
    Inicio: undefined;
}

const DrawerNavigatorScreen = createDrawerNavigator<DrawerNavigatorParamList>()

const DrawerNavigator = () => {

    const navigation = useNavigation();
    useLayoutEffect(() => { navigation.setOptions({ headerShown: false }); }, []);

    return (
        <DrawerNavigatorScreen.Navigator
            useLegacyImplementation
            initialRouteName="Inicio"
            drawerContent={CustomSideDrawerMenu}
            screenOptions={{ drawerActiveTintColor: 'white', drawerInactiveTintColor: 'black', headerTintColor: 'white', headerStyle: { backgroundColor: '#9921E8' } }}
        >
            <DrawerNavigatorScreen.Screen
                name='Perfil'
                component={PerfilScreen}
                options={{
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: 'bold'
                    },
                }}
            />
            <DrawerNavigatorScreen.Screen
                name='Inicio'
                options={{
                    headerTitle: () => {
                        let routeName: any = 'Home';
                        const mRoute: any = useNavigation<StackNavigationProp<TabStackParamList>>();
                        if (mRoute.getState().routes[1].state?.history?.slice(1, 2)[0] !== undefined) {
                            routeName = Object.values(mRoute.getState().routes[1].state?.history?.slice(1, 2)[0])[1];
                            routeName = routeName.substring(0, routeName.indexOf('-'));
                        }
                        return <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>{routeName}</Text>
                    },
                }}
                component={TabNavigator}
            />
        </DrawerNavigatorScreen.Navigator>

    )
}

export default DrawerNavigator