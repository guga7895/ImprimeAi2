import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import lojas from '../../data/lojas.json'; 
import { Image } from 'react-native';

const Main = ({ loja }) => {
  const [text, setText] = useState('');
  const [filteredStores, setFilteredStores] = useState([]);

  const navigation = useNavigation();

  const ApertarBotao = () => {
    const results = lojas.filter(loja =>
      loja.nome && loja.nome.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStores(results);
  };

  const handleDeliveriesPress = () => {
    //navigation.navigate('UserDeliveries', { user: user });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loja && <Text>Bem vindo ao painel de sua loja!</Text>}
      <Text style={styles.title}>{loja.nomeLoja}</Text>
      {loja.ImagemLoja && <Image source={{ uri: loja.ImagemLoja }} style={styles.image} />}
      <Text style={styles.subtitle}>Veja pedidos da sua loja!</Text>
      {loja && (
        <View style={styles.buttonContainer}>
          <Button title="Minhas Entregas" onPress={handleDeliveriesPress} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonContainer: {
    width: '50%',
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 48,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flatListBackground: {
    height: 400,
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  storeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    marginTop: 16,
    width: '50%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default Main;