import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ closeSidebar }) => {
  const navigation = useNavigation();

  const handleCadastroPress = () => {
    closeSidebar();
    navigation.navigate('Cadastro');
  };

  const handleLoginPress = () => {
    closeSidebar();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.option}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCadastroPress}>
        <Text style={styles.option}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 44,
    left: 0,
    width: '40%',
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    zIndex: 1000,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
  },
  option: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Sidebar;