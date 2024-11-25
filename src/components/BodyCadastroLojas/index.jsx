import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import BackButton from '../BackButton';
import { useNavigation } from '@react-navigation/native';

const CadastroLojas = () => {
  const [nomeLoja, setNomeLoja] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [descricao, setDescricao] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!nomeLoja || !endereco || !email || !password || !descricao || !image) {
      Alert.alert('Error', 'Please fill in all fields and select an image');
      return;
    }

    const imageName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + imageName;

    try {
      await FileSystem.copyAsync({ //copia a imagem do image (URI capturada) para o newPath (novo diretório do app)
        from: image,
        to: newPath,
      });

      const fileUri = FileSystem.documentDirectory + 'lojas.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      let lojas = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        lojas = JSON.parse(fileContent);
      }

      const newId = lojas.length > 0 ? Math.max(...lojas.map(loja => loja.id)) + 1 : 1;
      const rating = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
      const newLoja = { id: newId, nomeLoja, endereco, email, password, descricao, ImagemLoja: newPath, rating };

      lojas.push(newLoja);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(lojas));
      Alert.alert('Success', 'Usuário registrado com sucesso!');
      setNomeLoja('');
      setEmail('');
      setPassword('');
      setEndereco('');
      setDescricao('');
      setImage(null);
      navigation.navigate('LoginLojas', { loja: newLoja, image });
    } catch (error) {
      Alert.alert('Error', 'Um erro ocorreu. Tente novamente!');
    }
  };

  const clearStores = async () => {
    const fileUri = FileSystem.documentDirectory + 'lojas.json';
    try {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
      Alert.alert('Success', 'Todas as lojas foram removidas!');
    } catch (error) {
      Alert.alert('Error', 'Um erro ocorreu ao tentar remover as lojas. Tente novamente!');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastre-se!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nomeLoja}
        onChangeText={setNomeLoja}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço de seu local de entrega"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da sua arte"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Selecionar imagem que representa sua arte!</Text>
      </TouchableOpacity>
      <Button title="Confirmar cadastro" onPress={handleSignup} />
      <BackButton style={styles.backButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  imagePicker: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'center',
  },
});

export default CadastroLojas;