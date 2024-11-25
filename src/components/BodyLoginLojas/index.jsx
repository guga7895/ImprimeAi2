import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import BackButton from '../BackButton';
import { useNavigation } from '@react-navigation/native';

const Login = ({image}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, preencha ambos os campos.');
      return;
    }

    const fileUri = FileSystem.documentDirectory + 'lojas.json';

    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      if (!fileExists.exists) {
        Alert.alert('Error', 'Nenhum usuário encontrado.');
        return;
      }

      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const lojas = JSON.parse(fileContent);

      const loja = lojas.find(u => u.email === email && u.password === password);
      if (loja) {
        Alert.alert('Success', 'Login bem sucedido!');
        navigation.navigate('HomeLojas', { loja: loja, image});
      } else {
        Alert.alert('Error', 'Email ou senha inválido');
      }
    } catch (error) {
      Alert.alert('Error', 'Um erro ocorreu, tente novamente!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("CadastroLojas")}>
        <Text style={styles.signUpTexto}>Artista não cadastrado? Cadastre-se já!</Text>
      </TouchableOpacity>
      <View style={styles.flex} />
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
  signUpTexto: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 16,
  },
  flex: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Login;