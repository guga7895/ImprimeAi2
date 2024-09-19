import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/BodyHome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyPrint from '../components/BodyPrint';

const Impressao = ({route}) => {
    const { loja, user } = route.params;
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Header lojaNome={loja.nome} user={user}/>
                <BodyPrint loja={loja} user={user}/>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Impressao;