import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyLoginLojas from '../components/BodyLoginLojas/index';
import BackButton from '../components/BackButton';

const LoginLojas = ({route}) => {
    const { loja, image } = route.params || {};
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyLoginLojas loja={loja} image={image}/>
        </SafeAreaProvider>
    )
}

export default LoginLojas;
