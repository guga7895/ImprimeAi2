import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Header from '../components/Header';
import BodyStore from '../components/BodyStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Loja = ({route}) => {
  const { loja, user } = route.params;

  return (
    <SafeAreaProvider>
        <View style={styles.container}>
          <Header lojaNome={loja.nome} user={user}/>
          <BodyStore loja={loja} user={user}/>
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