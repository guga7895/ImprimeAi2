import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../BackButton/index';

const BodyStore = ({ loja, user }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.descricao}>Arte de exemplo</Text>
      {loja.ImagemLoja && <Image source={{ uri: loja.ImagemLoja }} style={styles.image} />}
      <Text style={styles.titulo}>Descrição</Text>
      <View style={styles.backgroundContainer}>
        <Text style={styles.descricao}>{loja.descricao}</Text>
      </View>
      <Text style={styles.rating}>O rating deste artista é: {loja.rating}/10</Text>
      <Text style={styles.rating}>O endereço desse artista é: {loja.endereco}</Text>
      <View style={styles.impressaoSolicitar}>
        <Button title="Solicitar arte" onPress={() => {
          console.log(loja.nomeLoja);
          navigation.navigate('Impressao', { loja: loja, user: user })}
         } />
      </View>
      <View style={styles.botaoVoltar}>
        <BackButton />
      </View>
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
  image: { // Added image style
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  descricao: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    padding: 10,
  },
  backgroundContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginTop: 12,
    borderRadius: 10,
  },
  titulo: {
    marginTop: 24,
    fontWeight: 'bold',
  },
  rating: {
    marginTop: 18,
  },
  impressaoSolicitar: {
    marginTop: 24,
    width: '50%',
  },
  botaoVoltar: {
    width: '50%',
    position: 'absolute',
    bottom: 36,
  }
});

export default BodyStore;