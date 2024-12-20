import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import BodyDelivery from '../components/BodyDelivery/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Entrega = ({route}) => {
    const {loja, quantity, user, document} = route.params;
    return (
        <SafeAreaProvider>
            <Header user={user}/>
            <BodyDelivery loja={loja} quantity={quantity} user={user} document={document}/>
        </SafeAreaProvider>
    )
}

export default Entrega;