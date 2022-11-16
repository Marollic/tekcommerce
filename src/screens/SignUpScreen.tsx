import React, { useLayoutEffect, useState, createRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Icon, Input, Text, Image, KeyboardAvoidingView, ScrollView } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import ImgBackground from '../component/ImgBackground';
import { AuthStackParamList } from '../navigator/AuthNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import Loader from '../component/Loader';

const img = require('../images/background_login.png');
const lgo = require('../images/Logo.png');
const lgoSucess = require('../images/success.png');


type SignUpNavigationProp = CompositeNavigationProp<StackNavigationProp<RootStackParamList>, StackNavigationProp<AuthStackParamList, 'SignUp'>>;

const SignUpScreen = () => {

    const navigation = useNavigation<SignUpNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            // title: '',
            // headerBackTitle: 'Voltar',
            // headerTintColor: '#552586',
            // headerTransparent: true,
        });
    }, [navigation]);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);


    const emailInputRef = createRef<any>();
    const passwordInputRef = createRef<any>();
    const passwordConfirmInputRef = createRef<any>();



    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Por favor infore o nome');
            return;
        }
        if (!userEmail) {
            alert('Por favor informe o e-mail');
            return;
        }
        if (!userPassword) {
            alert('Por favor informe a senha');
            return;
        }
        if (userPasswordConfirm !== userPassword) {
            alert('Senhas nao conferem');
            return;
        }

        //Show Loader
        setLoading(true);
        var dataToSend: any = {
            name: userName,
            email: userEmail,
            password: userPassword,
        };
        var formBody: any = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://tekcommerce.herokuapp.com/api/user/register', {
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
                    setIsRegistraionSuccess(true);
                    console.log(
                        'Registro realizado com sucesso. Por favor realize seu login'
                    );
                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#9921E8',
                    justifyContent: 'center',
                }}>
                <Image
                    alt='Success'
                    source={lgoSucess}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Registro realizado com sucesso
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.buttonTextStyle, {alignSelf: 'center'}]}>Login agora!</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (

        <ImgBackground source={img}
            resizeMode='cover'
            style={styles.image}>

            <View style={{ flex: 1, justifyContent: 'center' }}>

                <Loader loading={loading} />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flex: 1,
                    }}>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image alt='Logo' source={lgo} resizeMode='center' />
                    </View>

                    <View style={{ flex: 3 }}>
                        <KeyboardAvoidingView enabled>
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
                                        onChangeText={setUserName}
                                        underlineColorAndroid="#f000"
                                        _light={{
                                            placeholderTextColor: "blueGray.400",
                                        }}
                                        _dark={{
                                            placeholderTextColor: "blueGray.50",
                                        }}
                                        autoCapitalize="sentences"
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            emailInputRef.current && emailInputRef.current.focus()
                                        }
                                        blurOnSubmit={false}
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
                                        onChangeText={setUserEmail}
                                        underlineColorAndroid="#f000"
                                        keyboardType="email-address"
                                        ref={emailInputRef}
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            passwordInputRef.current &&
                                            passwordInputRef.current.focus()
                                        }
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
                                            placeholderTextColor: "blueGray.400",
                                        }}
                                        _dark={{
                                            placeholderTextColor: "blueGray.50",
                                        }}
                                        onChangeText={setUserPassword}
                                        underlineColorAndroid="#f000"
                                        ref={passwordInputRef}
                                        returnKeyType="next"
                                        onSubmitEditing={() =>
                                            passwordConfirmInputRef.current &&
                                            passwordConfirmInputRef.current.focus()
                                        }
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
                                        placeholder="Confirmar Senha"
                                        _light={{
                                            placeholderTextColor: "blueGray.400",
                                        }}
                                        _dark={{
                                            placeholderTextColor: "blueGray.50",
                                        }}
                                        onChangeText={setUserPasswordConfirm}
                                        underlineColorAndroid="#f000"
                                        ref={passwordConfirmInputRef}
                                        returnKeyType="next"
                                        onSubmitEditing={Keyboard.dismiss}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>

                            {/* Button */}
                            <View style={styles.buttonStyle}>
                                <Button
                                    style={styles.buttonDesign}
                                    onPress={handleSubmitButton}
                                >
                                    CRIAR CONTA
                                </Button>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
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
        marginRight: 15,
    },
    buttonStyleX: {
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15
    },
    buttonDesign: {
        backgroundColor: '#9921E8'
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});