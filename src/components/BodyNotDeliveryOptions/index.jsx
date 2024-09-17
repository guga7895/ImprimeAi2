import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../BackButton/index';

const BodyNotDeliveryOptions = ({loja}) => {
  const navigation = useNavigation();
  const teste = require('../../data/StoreImgs/lojaA.png')
  return (
    <SafeAreaView style={styles.container}>
      <Text>{loja.nome}</Text>   
    </SafeAreaView>
  );
};//LEMBRAR DE CONSTRUIR O COMPONENTE RATING NO FUTURO...

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
      width: '100%',
    },
    imageLoja: {
    },
    descricao:{
      textAlign: 'left', 
      fontSize: 16, 
      lineHeight: 24, 
      color: '#333', 
      padding: 10,
    },
    backgroundContainer: {
      backgroundColor: '#e0e0e0',
      padding: 10,
      marginTop:12, 
      borderRadius: 10,     
    },
    titulo: {
      marginTop:24,
      fontWeight: 'bold'
    },
    rating: {
      marginTop: 12,
    },
    impressaoSolicitar: {
      marginTop:12,
      width:'50%',
    },
    botaoVoltar: {
      marginTop:36
    }
  });

  export default BodyNotDeliveryOptions;