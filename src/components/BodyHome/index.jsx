import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const BodyHome = ({ user }) => {
  const [text, setText] = useState('');
  const [lojas, setLojas] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const fileUri = FileSystem.documentDirectory + 'lojas.json';
        const fileExists = await FileSystem.getInfoAsync(fileUri);

        if (fileExists.exists) {
          const fileContent = await FileSystem.readAsStringAsync(fileUri);
          const data = JSON.parse(fileContent);
          setLojas(data);
        } else {
          console.error('File not found:', fileUri);
        }
      } catch (error) {
        console.error('Error fetching lojas:', error);
      }
    };

    fetchLojas();
  }, []);

  const ApertarBotao = () => {
    const results = lojas.filter(loja =>
      loja.nomeLoja && loja.nomeLoja.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStores(results);
  };

  const handleDeliveriesPress = () => {
    navigation.navigate('UserDeliveries', { user: user });
  };

  return (
    <SafeAreaView style={styles.container}>
      {user && <Text>Seja bem vindo, {user.name}!!</Text>}
      <Text style={styles.title}>Pesquise artistas próximas de você</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui"
        value={text}
        onChangeText={setText}
      />
      <View style={styles.buttonContainer}>
        <Button title="Buscar" onPress={ApertarBotao} />
      </View>
      <Text style={styles.subtitle}>Lojas encontradas</Text>
      <View style={styles.flatListBackground}>
        <FlatList
          data={filteredStores}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              navigation.navigate('Loja', { loja: item, user: user });
            }}>
              <View style={styles.storeItem}>
                <Text style={styles.storeName}>{item.nomeLoja}</Text>
                <Text style={styles.storeAddress}>{item.endereco}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Nenhuma loja encontrada</Text>
          )}
        />
      </View>
      {user && (
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

export default BodyHome;