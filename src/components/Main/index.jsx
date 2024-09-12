import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import lojas from '../../data/lojas.json'; // Adjust the import path as needed

const Main = () => {
  const [text, setText] = useState('');
  const [filteredStores, setFilteredStores] = useState([]);

  const ApertarBotão = () => {
    // Filter the paper stores based on user input
    const results = lojas.filter(store =>
      store.nome && store.nome.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStores(results);
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Pesquise papelarias próximas a você</Text>
        <TextInput
            style={styles.input}
            placeholder="Digite aqui"
            value={text}
            onChangeText={setText}
        />
        <View style={styles.buttonContainer}>
            <Button title="Buscar" onPress={ApertarBotão} />
        </View>
        <Text style={styles.subtitle}>Lojas encontradas</Text>
        <View style={styles.flatListBackground}>
            <FlatList
                data={filteredStores}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                <View style={styles.storeItem}>
                    <Text style={styles.storeName}>{item.nome}</Text>
                    <Text style={styles.storeAddress}>{item.endereco}</Text>
                </View>
                )}
                ListEmptyComponent={() => (
                <Text style={styles.emptyListText}>Nenhuma loja encontrada</Text>
                )}
            />
        </View>
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
        height: 400, // Fixed height for the FlatList
        width: '100%',
        backgroundColor: '#f0f0f0', // Light gray background
        padding: 10,
        borderRadius: 10, // Rounded corners
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
  });

export default Main;