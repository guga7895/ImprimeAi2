import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header/index';
import BodyDelivery from '../components/BodyDelivery/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyFrontPage from '../components/BodyFrontPage/index';

const FrontPage = ({route}) => {
    const { user } = route.params || {};
    return (
        <SafeAreaProvider>
            <Header/>
            <BodyFrontPage user={user}/>
        </SafeAreaProvider>
    )
}

export default FrontPage;