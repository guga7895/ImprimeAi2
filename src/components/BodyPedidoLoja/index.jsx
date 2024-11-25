import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import BackButton from '../BackButton';


const PedidoDetails = ({ pedido }) => {
  const documentUri = pedido.find(detail => detail.label === 'Documento')?.value;

  const handleDownload = async () => {
    if (!documentUri) {
      Alert.alert('Error', 'No document to download');
      return;
    }

    const fileName = documentUri.split('/').pop();
    const timestamp = new Date().getTime();
    const newFileName = `${timestamp}_${fileName}`;
    const fileUri = FileSystem.documentDirectory + newFileName;
    console.log('Document URI:', documentUri);
    console.log('Saving to:', fileUri);

    try {
      if (documentUri.startsWith('file')) {
        await saveImage(documentUri);
      } else {
        throw new Error('Unsupported URI scheme');
      }
      Alert.alert('Success', 'Document downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download document');
    }
  };

  const saveImage = async (uri) => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        // Save image to media library
        await MediaLibrary.saveToLibraryAsync(uri);
        console.log("Image successfully saved");
        Alert.alert('Success', 'Imagem salva no dispositivo!');
      } else {
        Alert.alert('Error', 'Permission to access media library is required');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save image to media library');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido</Text>
      {pedido
        .filter(detail => detail.label !== 'Documento')
        .map((detail, index) => (
          <Text key={index} style={styles.detail}>
            {detail.label}: {detail.value}
          </Text>
        ))}
      {documentUri && (
        <>
          <Image source={{ uri: documentUri }} style={styles.image} />
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
            <Text style={styles.downloadButtonText}>Download Image</Text>
          </TouchableOpacity>
        </>
      )}
      <BackButton/>
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
    marginBottom: 24,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  downloadButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PedidoDetails;