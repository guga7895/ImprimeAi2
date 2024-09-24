import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import BackButton from '../BackButton';

const Deliveries = ({ user }) => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const filePath = FileSystem.documentDirectory + 'requests.json';
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        const data = await FileSystem.readAsStringAsync(filePath);
        const allDeliveries = JSON.parse(data);
        console.log('All Deliveries:', allDeliveries); // Log the data to debug

        const userDeliveries = allDeliveries.filter(delivery => 
          Array.isArray(delivery) && delivery.some(item => item.label === 'Email' && item.value === user.email)
        );
        setDeliveries(userDeliveries);
      }
    };

    fetchDeliveries();
  }, [user.email]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minhas Entregas</Text>
      <FlatList
        data={deliveries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.deliveryItem}>
            {item.map((detail, index) => (
              <Text key={index} style={styles.deliveryDetail}>
                {detail.label}: {detail.value}
              </Text>
            ))}
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Nenhuma entrega encontrada</Text>
        )}
      />
      <BackButton />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deliveryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  deliveryDetail: {
    fontSize: 16,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default Deliveries;