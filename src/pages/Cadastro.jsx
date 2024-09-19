import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyCadastro from '../components/BodyCadastro/index'
import BackButton from '../components/BackButton';

const Delivery = ({route}) => {
    //const { loja, opcaoEntrega, endereco, quantity } = route.params;
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyCadastro/>
        </SafeAreaProvider>
    )
}

export default Delivery;
