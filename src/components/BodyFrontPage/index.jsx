import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BodyFrontPage({ user }) {
    const navigation = useNavigation();
    return (
        <ImageBackground 
            source={require('../../data/teste.jpeg')} // Substitua pelo caminho da sua imagem
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.welcomeText}>
                    Seja bem vindo ao InspiraArte, o App para artistas e amantes da arte!
                </Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate("LoginLojas")}
                >
                    <Text style={styles.buttonText}>É um artista?</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate("Home", { user })}
                >
                    <Text style={styles.buttonText}>É um cliente comum?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Redimensiona a imagem para cobrir todo o espaço
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente sobre a imagem
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFFFFF', // Texto branco para melhor contraste
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default BodyFrontPage;
