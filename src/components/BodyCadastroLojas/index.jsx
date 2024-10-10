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
      await FileSystem.copyAsync({
        from: image,
        to: newPath,
      });

      const user = { nomeLoja, endereco, email, password, descricao, ImagemLoja: newPath };
      const fileUri = FileSystem.documentDirectory + 'lojas.json';

      const fileExists = await FileSystem.getInfoAsync(fileUri);
      let users = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        users = JSON.parse(fileContent);
      }

      users.push(user);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(users));
      Alert.alert('Success', 'Usuário registrado com sucesso!');
      setNomeLoja('');
      setEmail('');
      setPassword('');
      setEndereco('');
      setDescricao('');
      setImage(null);
      navigation.navigate('LoginLojas', { loja: user, image });
    } catch (error) {
      Alert.alert('Error', 'Um erro ocorreu. Tente novamente!');
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
      setImage(result.assets[0].uri); // Correctly set the image URI
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastre-se!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Loja"
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
        placeholder="Endereço de sua loja"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da loja"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Selecionar imagem da loja</Text>
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