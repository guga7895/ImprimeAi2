import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyUserDeliveries from '../components/BodyUserDeliveries/index'

const UserDeliveries = ({route}) => {
    const { user } = route.params;
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyUserDeliveries user={user}/>
        </SafeAreaProvider>
    )
}

export default UserDeliveries;
