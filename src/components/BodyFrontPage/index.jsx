import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function BodyFrontPage({user}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        <Text style={styles.welcomeText}>Seja bem vindo ao ImprimeAí, o App que traz sua impressão até você!</Text>
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("LoginLojas")}>
            <Text style={styles.buttonText}>É dono de uma loja?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home", {user})}>
            <Text style={styles.buttonText}>É um cliente comum?</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: 200, // Fixed width for buttons
        alignItems: 'center', // Center text horizontally
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default BodyFrontPage;