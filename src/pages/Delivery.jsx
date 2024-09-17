import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyDeliveryOptions from '../components/BodyDeliveryOptions/index'


const Delivery = ({route}) => {
    const { loja, opcaoEntrega, endereco } = route.params;
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyDeliveryOptions loja={loja} opcaoEntrega={opcaoEntrega} endereco={endereco}/>
        </SafeAreaProvider>
    )
}

export default Delivery;