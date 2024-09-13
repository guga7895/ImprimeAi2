import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/HeaderHome';
import Main from '../components/MainHome';
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