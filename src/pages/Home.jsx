import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/BodyHome';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaProvider>
        <View style={styles.container}>
        <Header />
        <Main />
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