import React, { useLayoutEffect, useState, createRef } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Button, Icon, Text, KeyboardAvoidingView, ScrollView, Input } from 'native-base';
import { Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../component/Loader';


const ProdutosScreen = ({ navigation }: any) => {

  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [address, setAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);

  useLayoutEffect(() => {
    AsyncStorage.getItem('user_id').then((value) => {
      fetch(`https://tekcommerce.herokuapp.com/api/user/search?q=${value}`, {
        method: 'GET',
        headers: {

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
        })
    })
    navigation.setOptions({
      headerShown: false,
    });
  }, [userName]);

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const descriptionInputRef = createRef<any>();
  const priceInputRef = createRef<any>();
  const discountPercentageInputRef = createRef<any>();
  const ratingInputRef = createRef<any>();
  const stockInputRef = createRef<any>();
  const brandInputRef = createRef<any>();
  const categoryInputRef = createRef<any>();

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
          justifyContent: 'center',
          alignContent: 'center',
          flex: 1,
        }}>


        <KeyboardAvoidingView enabled>
          <ScrollView>

            {/* Product Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome5 name="product-hunt" />}
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
                  placeholder="Nome do produto"
                  onChangeText={setTitle}
                  value={`${title}`}
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
                    descriptionInputRef.current && descriptionInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Description Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="description" />}
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
                  placeholder="Description"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={setDescription}
                  value={`${description}`}
                  underlineColorAndroid="#f000"
                  keyboardType='default'
                  ref={descriptionInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    priceInputRef.current &&
                    priceInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Price Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="attach-money" />}
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
                  placeholder="Price"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={setPrice}
                  value={`${price}`}
                  underlineColorAndroid="#f000"
                  keyboardType='numeric'
                  ref={priceInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    discountPercentageInputRef.current &&
                    discountPercentageInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Discount Percentage Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="brightness-percent" />}
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
                  placeholder="Discount percentage"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={setDiscountPercentage}
                  value={`${discountPercentage}`}
                  underlineColorAndroid="#f000"
                  keyboardType='numeric'
                  ref={discountPercentageInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    ratingInputRef.current &&
                    ratingInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Rating Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="star-rate" />}
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
                  placeholder="Rating"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={setRating}
                  value={`${rating}`}
                  underlineColorAndroid="#f000"
                  keyboardType='numeric'
                  ref={ratingInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    stockInputRef.current &&
                    stockInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Stock Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome5 name="boxes" />}
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
                  placeholder="Stock"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={setStock}
                  value={`${stock}`}
                  underlineColorAndroid="#f000"
                  keyboardType='numeric'
                  ref={stockInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    brandInputRef.current &&
                    brandInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Brand Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<Octicons name="typography" />}
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
                  placeholder="Brand"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={setBrand}
                  value={`${brand}`}
                  underlineColorAndroid="#f000"
                  keyboardType='default'
                  ref={brandInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    categoryInputRef.current &&
                    categoryInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>

            {/* Category Input Field */}
            <View style={styles.buttonStyleX}>

              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="category" />}
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
                  placeholder="Category"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={setCategory}
                  value={`${category}`}
                  underlineColorAndroid="#f000"
                  keyboardType='default'
                  ref={categoryInputRef}
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
            </View>

          </ScrollView>
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

export default ProdutosScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginTop: 8,
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