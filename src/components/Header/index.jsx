import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({lojaNome: nomeLojaSelecionada}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={nomeLojaSelecionada ? styles.headerLoja : styles.headerCentralizado}>
        {nomeLojaSelecionada && (
          <Text style={styles.nomeLoja}>{nomeLojaSelecionada}</Text>
        )}
        <Text style={nomeLojaSelecionada ? styles.imprimeAi : styles.imprimeAiCentered}>
          ImprimeAí
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 0,
    },
    headerLoja: {
      backgroundColor: 'green',
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerCentralizado: {
      backgroundColor: 'green',
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nomeLoja: {
      flex: 1,
      textAlign: 'left',
      color: 'white',
    },
    imprimeAi: {
      textAlign: 'right',
      color: 'white',
    },
    imprimeAiCentered: {
      textAlign: 'center',
      color: 'white',
    },
});

export default Header;
