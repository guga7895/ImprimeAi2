import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import BodyNotDeliveryOptions from '../components/BodyNotDeliveryOptions/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const NotDelivery = ({route}) => {
    const { loja } = route.params;

    return (
        <SafeAreaProvider>
            <Header/>
            <BodyNotDeliveryOptions loja={loja}/>
        </SafeAreaProvider>
    )
}

export default NotDelivery;