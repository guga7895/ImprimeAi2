import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/BodyHome';
import Sidebar from '../components/Sidebar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyHomeLojas from '../components/BodyHomeLojas';
const Home = ({route}) => {
  const {loja, image} = route.params || {};

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header isHomePage={false} lojaNome={loja.nomeLoja} />
        <BodyHomeLojas loja={loja} image={image}/>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;