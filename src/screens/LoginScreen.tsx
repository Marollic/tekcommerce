import React, { useLayoutEffect, useState, createRef } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, Input, Text, Image, KeyboardAvoidingView } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Loader from '../component/Loader';
import ImgBackground from '../component/ImgBackground';
import { AuthStackParamList } from '../navigator/AuthNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';

const img = require('../images/background_login.png');
const lgo = require('../images/Logo.png');

const LoginScreen = ({ navigation }: NativeStackScreenProps<AuthStackParamList, 'Login'>) => {

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef<any>()

    const mainNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();    

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Por favor informe seu Email');
            return;
        }
        if (!userPassword) {
            alert('Por favor informe sua senha');
            return;
        }
        setLoading(true);
        let dataToSend: any = { email: userEmail, password: userPassword };
        let formBody: any = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://tekcommerce.herokuapp.com/api/user/login', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    AsyncStorage.setItem('user_id', responseJson.data.email);
                    console.log(responseJson.data.email);
                    mainNavigation.replace('Main');
                } else {
                    setErrortext(responseJson.msg);
                    console.log('Please check your email id or password');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    return (

        <ImgBackground source={img}
            resizeMode='cover'
            style={styles.image}>

            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

                <Loader loading={loading} />
                
                <KeyboardAvoidingView enabled>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Image alt='Logo' source={lgo} style={{ height: '100%' }} />
                    </View>

                    <View style={{ flex: 7 }}>
                        <View style={styles.Middle}>
                            <Text style={styles.LoginText} paddingTop={'3'}>Login</Text>
                        </View>


                        <View style={styles.text2}>
                            <Text>Ainda não tem uma conta? </Text>
                            <TouchableOpacity onPress={() =>
                                navigation.navigate("SignUp")
                            } >
                                <Text style={styles.signupText}> Sign up</Text>
                            </TouchableOpacity>
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
                                    placeholder="Username or Email"
                                    _light={{
                                        placeholderTextColor: "blueGray.100",
                                    }}
                                    _dark={{
                                        placeholderTextColor: "blueGray.50",
                                    }}
                                    onChangeText={setUserEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    returnKeyType='next'
                                    onSubmitEditing={() =>
                                        passwordInputRef.current &&
                                        passwordInputRef.current.focus()
                                    }
                                    underlineColorAndroid="#f000"
                                    blurOnSubmit={false}
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
                                        placeholderTextColor: "blueGray.100",
                                    }}
                                    _dark={{
                                        placeholderTextColor: "blueGray.50",
                                    }}
                                    onChangeText={setUserPassword}
                                    keyboardType="default"
                                    ref={passwordInputRef}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="#f000"
                                    returnKeyType="next"
                                />
                            </View>
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        {/* Button */}
                        <View style={styles.buttonStyle}>
                            <Button
                                style={styles.buttonDesign}
                                onPress={handleSubmitPress}
                            >
                                LOGIN
                            </Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImgBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginText: {
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
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});