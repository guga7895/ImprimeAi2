import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyCadastroLojas from '../components/BodyCadastroLojas/index';

const Delivery = ({route}) => {
    //const { loja, opcaoEntrega, endereco, quantity } = route.params;
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyCadastroLojas/>
        </SafeAreaProvider>
    )
}

export default Delivery;
