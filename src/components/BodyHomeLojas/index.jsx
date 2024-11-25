import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BodyHomeLoja = ({ loja }) => {
  const [deliveries, setDeliveries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const filePath = FileSystem.documentDirectory + 'requests.json';
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          const fileContent = await FileSystem.readAsStringAsync(filePath);
          const data = JSON.parse(fileContent);
          const lojaDeliveries = data.filter(delivery => 
            Array.isArray(delivery) && delivery.some(item => item.label === 'Loja' && item.value === loja.nomeLoja)
          );
          setDeliveries(lojaDeliveries);
        } else {
          console.error('File not found:', filePath);
        }
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };

    fetchDeliveries();
  }, [loja.nomeLoja]);

  const handlePress = (pedido) => {
    navigation.navigate('PedidoLoja', { pedido, loja });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loja && <Text>Bem vindo ao painel de sua loja de arte!</Text>}
      <Text style={styles.title}>{loja.nomeLoja}</Text>
      {loja.ImagemLoja && <Image source={{ uri: loja.ImagemLoja }} style={styles.image} />}

      <Text style={styles.subtitle}>Veja pedidos da sua arte!</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={deliveries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={styles.storeItem}>
                {item.map((detail, index) => (
                  <Text key={index} style={styles.storeDetail}>
                    {detail.label}: {detail.value}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Nenhuma entrega encontrada</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 48,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flatListContainer: {
    flex: 1, // Allow the FlatList to take up available space
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  storeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  storeDetail: {
    fontSize: 16,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default BodyHomeLoja;