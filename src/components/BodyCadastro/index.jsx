import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import BackButton from '../BackButton';
import { useNavigation } from '@react-navigation/native';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    const user = { name, email, password };
    const fileUri = FileSystem.documentDirectory + 'users.json';

    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      let users = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        users = JSON.parse(fileContent);
      }

      users.push(user);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(users));
      Alert.alert('Success', 'Usuário registrado com sucesso!');
      setEmail('');
      setPassword('');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Um erro ocorreu. Tente novamente!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastre-se!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
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
  backButton: {
    alignSelf: 'center',
  },
});

export default Cadastro;