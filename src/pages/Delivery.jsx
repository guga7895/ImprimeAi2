import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyDeliveryOptions from '../components/BodyDeliveryOptions/index'


const Delivery = ({route}) => {
    const { loja, opcaoEntrega, endereco, quantity, user, data } = route.params;
    return (
        <SafeAreaProvider>
            <Header user={user}/>
            <BodyDeliveryOptions loja={loja} opcaoEntrega={opcaoEntrega} endereco={endereco} quantity={quantity} user={user} data={data}/>
        </SafeAreaProvider>
    )
}

export default Delivery;