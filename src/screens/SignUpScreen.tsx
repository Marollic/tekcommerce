import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Icon, Input, Text, Image } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import ImgBackground from '../component/ImgBackground';
import { AuthStackParamList } from '../navigator/AuthNavigator';


export type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const img = require('../images/background_login.png');
const lgo = require('../images/Logo.png');

const SignUpScreen = () => {

    const navigation = useNavigation<SignUpScreenNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            // title: '',
            // headerBackTitle: 'Voltar',
            // headerTintColor: '#552586',
            // headerTransparent: true,
        });
    }, [navigation]);

    return (

        <ImgBackground source={img}
            resizeMode='cover'
            style={styles.image}>


            <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', height: '1%' }}>
                <Image alt='Logo' source={lgo} style={{ margin: 30 }} />
            </SafeAreaView>

            <View style={styles.Middle}>
                <Text style={styles.LoginText} paddingTop={'3'}>SignUp</Text>
            </View>
            <View style={styles.text2}>
                <Text>Ja possui uma conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} ><Text style={styles.signupText}> Login </Text></TouchableOpacity>
            </View>

            {/* Username or Email Input Field */}
            <View style={styles.buttonStyle}>

                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user-secret" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: "black",
                                }}
                                _dark={{
                                    color: "gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="Nome de usuario"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}

                    />
                </View>
            </View>

            {/* Username or Email Input Field */}
            <View style={styles.buttonStyleX}>

                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<MaterialCommunityIcons name="email" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: "black",
                                }}
                                _dark={{
                                    color: "gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="E-mail"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}

                    />
                </View>
            </View>

            {/* Password Input Field */}
            <View style={styles.buttonStyleX}>

                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="key" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: "black",
                                }}
                                _dark={{
                                    color: "gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        secureTextEntry={true}
                        placeholder="Senha"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                    />
                </View>
            </View>

            {/* Password Input Field */}
            <View style={styles.buttonStyleX}>

                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="key" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: "black",
                                }}
                                _dark={{
                                    color: "gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        secureTextEntry={true}
                        placeholder="Confirmar Senha"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                    />
                </View>
            </View>

            {/* Button */}
            <View style={styles.buttonStyle}>
                <Button style={styles.buttonDesign}>
                    CRIAR CONTA
                </Button>
            </View>

        </ImgBackground>

    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    LoginText: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'bold',
    },
    Middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5
    },
    signupText: {
        fontWeight: 'bold'
    },
    emailField: {
        marginTop: 30,
        marginLeft: 15
    },
    emailInput: {
        marginTop: 10,
        marginRight: 5
    },
    buttonStyle: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15
    },
    buttonStyleX: {
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15
    },
    buttonDesign: {
        backgroundColor: '#9921E8'
    },

});