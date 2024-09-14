import React from "react"
import { View,Button,StyleSheet } from "react-native"
import { useNavigation} from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.buttonVoltarContainer}>
            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonVoltarContainer: {
        width: '50%',
        marginTop: 16,
    },
})

export default BackButton;