import React, { useLayoutEffect, useState, createRef } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Button, Icon, Text, KeyboardAvoidingView, ScrollView, Input } from 'native-base';
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../component/Loader';


const PerfilScreen = ({ navigation }: any) => {

  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [address, setAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

  useLayoutEffect(() => {
    AsyncStorage.getItem('user_id').then((value) => {
      fetch(`https://tekcommerce.herokuapp.com/api/user/search?q=${value}`, {
        method: 'GET',
        headers: {
          //Header Defination
          'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {

          setUserName(responseJson.data[0].name);
          setAge(responseJson.data[0].age);
          setUserEmail(responseJson.data[0].email);
          setAddress(responseJson.data[0].address);
          setUserPassword(responseJson.data[0].password);
          setUserPasswordConfirm(responseJson.data[0].password);

          if (userName)
            navigation.setOptions({
              title: `${userName}`,
            });
        })
    })

  }, [userName]);

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const ageInputRef = createRef<any>();
  const emailInputRef = createRef<any>();
  const addressInputRef = createRef<any>();
  const passwordInputRef = createRef<any>();
  const passwordConfirmInputRef = createRef<any>();



  const handleSubmitButton = () => {

    setErrortext('');
    if (!userName) {
      alert('Por favor infore o nome');
      return;
    }
    if (!age || parseInt(age) < 1) {
      alert('Por favor sua idade');
      return;
    }
    if (!userEmail) {
      alert('Por favor informe o e-mail');
      return;
    }
    if (!address) {
      alert('Por favor informe seu endereco');
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
      age: parseInt(age),
      email: userEmail,
      address: address,
      password: userPassword,
    };

    var formBody: any = [];

    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    fetch('https://tekcommerce.herokuapp.com/api/user', {
      method: 'PUT',
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
          console.log(
            'Registro atualizado com sucesso.'
          );
          alert(responseJson.msg);
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


  return (

    <View style={{ flex: 1 }}>

      <Loader loading={loading} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          alignContent: 'center',
          flex: 1,
        }}>




        <KeyboardAvoidingView enabled>

          {/* Username Input Field */}
          <View style={styles.buttonStyleX}>

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
                value={`${userName}`}
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
                  ageInputRef.current && ageInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
          </View>


          {/* Age  Input Field */}
          <View style={styles.buttonStyleX}>

            <View style={styles.emailInput}>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="numeric" />}
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
                placeholder="idade"
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
                onChangeText={setAge}
                value={`${age}`}
                underlineColorAndroid="#f000"
                keyboardType='numeric'
                ref={ageInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current &&
                  emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
          </View>

          {/* Email Input Field */}
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
                value={`${userEmail}`}
                underlineColorAndroid="#f000"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  addressInputRef.current &&
                  addressInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
          </View>

          {/* Address Input Field */}
          <View style={styles.buttonStyleX}>

            <View style={styles.emailInput}>
              <Input
                InputLeftElement={
                  <Icon
                    as={<Entypo name="address" />}
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
                placeholder="Address"
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
                onChangeText={setAddress}
                value={`${address}`}
                underlineColorAndroid="#f000"
                keyboardType='default'
                ref={addressInputRef}
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
                value={`${userPassword}`}
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
                value={`${userPasswordConfirm}`}
                underlineColorAndroid="#f000"
                ref={passwordConfirmInputRef}
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        {errortext != '' ? (
          <Text style={styles.errorTextStyle}>
            {errortext}
          </Text>
        ) : null}

        {/* Button */}
        <View style={styles.buttonStyle}>
          <Button
            style={styles.buttonDesign}
            onPress={handleSubmitButton}
          >
            ATUALIZAR DADOS
          </Button>
        </View>


      </ScrollView>
    </View>
  )
}

export default PerfilScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15
  },
  buttonStyle: {
    margin: 15,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonDesign: {
    backgroundColor: '#9921E8',
    borderRadius: 5,
    fontSize: 28,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
