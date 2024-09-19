import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyLogin from '../components/BodyLogin/index'
import BackButton from '../components/BackButton';

const Login = ({route}) => {
    //const { loja, opcaoEntrega, endereco, quantity } = route.params;
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyLogin/>
        </SafeAreaProvider>
    )
}

export default Login;
