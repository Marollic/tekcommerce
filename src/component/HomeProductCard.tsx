import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../screens/HomeScreen';

const { height, width } = Dimensions.get('window');

const HomeProductCard = ({ thumbnail, brand, description, stock, price }: any) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (<View style={styles.viewCard}>
        <TouchableOpacity onPress={()=> navigation.navigate('MyModal')}>
            <Image source={{ uri: thumbnail }} resizeMode='contain' style={{ height: 140, borderRadius: 5, width: width * 0.35, alignSelf: 'center', margin: 5 }} />
            <View style={{ alignItems: 'flex-start', margin: 5 }}>
                <Text>Marca: {brand}</Text>
                <Text>Descricao: {description}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 5 }}>
                <Text>Preco: {price}</Text>
                <Text>Stock: {stock}</Text>
            </View>
        </TouchableOpacity>
    </View>)
}


export default HomeProductCard

const styles = StyleSheet.create({
    viewCard: {
        marginTop: 15,
        marginHorizontal: 17,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#9921E8',
    }
})