import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Header from '../components/Header';
import BodyStore from '../components/BodyStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Loja = ({route}) => {
  const { loja } = route.params;

  return (
    <SafeAreaProvider>
        <View style={styles.container}>
          <Header lojaNome={loja.nome}/>
          <BodyStore loja={loja}/>
        </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Loja;