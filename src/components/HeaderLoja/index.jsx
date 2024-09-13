import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text>ImprimeAí</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 0,
    },
    header: {
        backgroundColor: 'green',
        alignItems: 'center',
        padding: 15,
    },
});

export default Header;
