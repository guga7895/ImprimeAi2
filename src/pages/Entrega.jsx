import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import BodyDelivery from '../components/BodyDelivery/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Entrega = ({route}) => {
    const {loja} = route.params;
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyDelivery loja={loja}/>
        </SafeAreaProvider>
    )
}

export default Entrega;