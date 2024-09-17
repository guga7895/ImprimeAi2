import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../BackButton/index';
import { WebView } from 'react-native-webview';

const BodyDeliveryOptions = ({ loja, opcaoEntrega, endereco }) => {
  const navigation = useNavigation();
  const [trackingUrl, setTrackingUrl] = useState('');


  const getOAuthToken = async () => {
    try {
      const response = await fetch('https://auth.uber.com/oauth/v2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: 'JiTjBGiywfkwIoLiX5QGLS0DKQFAFZgv', // Replace with your client ID
          client_secret: 'E5bi7srFsGBSQrm6RGlTXmRfeL-9fVNW5JVVOJcq', // Replace with your client secret
          grant_type: 'client_credentials',
          scope: 'eats.deliveries',
        }).toString(),
      });

      const data = await response.json();
      if (response.ok) {
        return data.access_token;
      } else {
        Alert.alert('Error', data.error_description || 'Failed to obtain OAuth token');
        return null;
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to obtain OAuth token');
      return null;
    }
  };

  const createQuote = async (token) => {
    const now = new Date();
    const pickupReadyTime = new Date(now.getTime() + 10 * 60 * 1000).toISOString(); // 10 minutes from now
    const pickupDeadlineTime = new Date(now.getTime() + 30 * 60 * 1000).toISOString(); // 30 minutes from now
    const dropoffReadyTime = new Date(now.getTime() + 30 * 60 * 1000).toISOString(); // 40 minutes from now
    const dropoffDeadlineTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // 60 minutes from now
    try {
      const response = await fetch(`https://api.uber.com/v1/customers/b9e7be35-f091-5fd5-a6f8-abdb92b5f514/delivery_quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          pickup_address: '{"street_address": ["20 W 34th St", "Floor 2"],"state":"NY","city":"New York","zip_code":"10001","country":"US"}',
          dropoff_address: `{"street_address": ["${endereco}"],"state":"NY","city":"New York","zip_code":"10006","country":"US"}`,
          pickup_name: 'My Store',
          pickup_phone_number: '4444444444',
          dropoff_name: 'Reese Ippient',
          dropoff_phone_number: '5555555555',
          pickup_ready_dt: pickupReadyTime,
          pickup_deadline_dt: pickupDeadlineTime,
          dropoff_ready_dt: dropoffReadyTime,
          dropoff_deadline_dt: dropoffDeadlineTime,
          dropoff_latitude: 40.71301,
          dropoff_longitude: -74.01317,
          manifest: [
            {
              name: 'Papel',
              quantity: 1,
              weight: 30,
              dimensions: {
                length: 40,
                height: 40,
                depth: 40,
              },
            },
          ],
        }),
      });

      const data = await response.json();
      console.log('Quote Response:', data);
      if (response.ok) {
        return data.id;
      } else {
        Alert.alert('Error', data.message || 'Failed to create quote');
        return null;
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create quote');
      return null;
    }
  };

  const createDelivery = async (token, quoteId) => {
    const now = new Date();
    const pickupReadyTime = new Date(now.getTime() + 40 * 60 * 1000).toISOString(); // 10 minutes from now
    const pickupDeadlineTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // 30 minutes from now
    const dropoffReadyTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // 40 minutes from now
    const dropoffDeadlineTime = new Date(now.getTime() + 80 * 60 * 1000).toISOString(); // 60 minutes from now
    try {
      const response = await fetch(`https://api.uber.com/v1/customers/b9e7be35-f091-5fd5-a6f8-abdb92b5f514/deliveries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          quote_id: quoteId,
          pickup_address: '{"street_address": ["20 W 34th St", "Floor 2"],"state":"NY","city":"New York","zip_code":"10001","country":"US"}',
          pickup_name: 'My Store',
          pickup_phone_number: '4444444444',
          pickup_latitude: 40.74868,
          pickup_longitude: -73.98561,
          dropoff_address: `{"street_address": ["${endereco}"],"state":"NY","city":"New York","zip_code":"10006","country":"US"}`,
          dropoff_name: 'Reese Ippient',
          dropoff_phone_number: '5555555555',
          dropoff_latitude: 40.71301,
          dropoff_longitude: -74.01317,
          manifest_items: [
            {
              name: 'Papel',
              quantity: 1,
              weight: 30,
              dimensions: {
                length: 40,
                height: 40,
                depth: 40,
              },
            },
          ],
          pickup_ready_dt: pickupReadyTime,
          pickup_deadline_dt: pickupDeadlineTime,
          dropoff_ready_dt: dropoffReadyTime,
          dropoff_deadline_dt: dropoffDeadlineTime,
          external_store_id: "my_store_123"
        }),
      });

      const data = await response.json();
      console.log('Delivery Response:', data);
      if (response.ok) {
        setTrackingUrl(data.tracking_url);
        Alert.alert('Success', 'Fake Uber delivery created successfully!');
      } else {
        Alert.alert('Error', data.message || 'Failed to create delivery');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create delivery');
    }
  };

  const handleUberPress = async () => {
    const token = await getOAuthToken();
    if (token) {
      const quoteId = await createQuote(token);
      if (quoteId) {
        await createDelivery(token, quoteId);
      }
    }
  };

  const handleTrackDelivery = () => {
    if (trackingUrl) {
      navigation.navigate('WebUberView', { url: trackingUrl });
    } else {
      Alert.alert('Error', 'No tracking URL available');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleUberPress} style={styles.uberButton}>
        <Image source={require('../../data/StoreImgs/uberLogo.png')} style={styles.uberLogo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTrackDelivery} style={styles.trackButton}>
        <Text style={styles.trackButtonText}>Track Delivery</Text>
      </TouchableOpacity>
      <BackButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  uberButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  uberLogo: {
    width: 50,
    height: 50,
  },
  trackButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageLoja: {},
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
    marginTop: 12,
  },
  impressaoSolicitar: {
    marginTop: 12,
    width: '50%',
  },
  botaoVoltar: {
    marginTop: 36,
  },
});

export default BodyDeliveryOptions;