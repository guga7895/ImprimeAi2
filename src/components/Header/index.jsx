import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import { useNavigation } from '@react-navigation/native';

const Header = ({ lojaNome: nomeLojaSelecionada, isHomePage, openSidebar, user }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Home', { user });
    console.log(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={nomeLojaSelecionada ? styles.headerLoja : styles.headerCentralizado}>
        {isHomePage && (
          <TouchableOpacity onPress={openSidebar} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
        )}
        {nomeLojaSelecionada && (
          <Text style={styles.nomeLoja}>{nomeLojaSelecionada}</Text>
        )}
        <TouchableOpacity onPress={handleHomePress}>
          <Text style={nomeLojaSelecionada ? styles.imprimeAi : styles.imprimeAiCentered}>
            ImprimeAí
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 0,
  },
  headerLoja: {
    backgroundColor: 'green',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCentralizado: {
    backgroundColor: 'green',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 10,
  },
  nomeLoja: {
    flex: 1,
    textAlign: 'left',
    color: 'white',
  },
  imprimeAi: {
    textAlign: 'right',
    color: 'white',
  },
  imprimeAiCentered: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Header;