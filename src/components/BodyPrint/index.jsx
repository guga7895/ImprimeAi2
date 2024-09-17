import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";
import { Picker } from '@react-native-picker/picker'; 
import * as DocumentPicker from 'expo-document-picker';
import BackButton from '../BackButton/index';
import defaultImage from '../../data/StoreImgs/defaultImage.png';
import opcoesPapel from '../../data/opcoesPapel.json'; 
import opcoesImpressao from '../../data/opcoesImpressao.json'; 
import { useNavigation } from '@react-navigation/native';

const BodyPrint = ({loja}) => {
    const navigation = useNavigation();
    const [document, setDocument] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState(opcoesPapel[0].value);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log('Document Picker Result:', result.assets[0]); 
        setDocument(result.assets[0]);
        console.log('Document set:', result.assets[0]); 
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.previewContainer}>
                <Text style={styles.previewText}>Preview do documento:</Text>
                <View style={styles.previewImageContainer}>
                    <Image 
                        source={document ? { uri: document.uri } : defaultImage} 
                        style={styles.previewImage} 
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
                <Text style={styles.uploadButtonText}>Selecione o documento</Text>
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantidade:</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de papel:</Text>
                <Picker
                    selectedValue={selectedOption}
                    onValueChange={(itemValue) => setSelectedOption(itemValue)}
                    style={styles.picker}
                >
                    {opcoesPapel.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de impressão</Text>
                <Picker
                    selectedValue={selectedOption}
                    onValueChange={(itemValue) => setSelectedOption(itemValue)}
                    style={styles.picker}
                >
                    {opcoesImpressao.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            <View style={styles.buttonNext}>
                <Button color="green" title="Avançar" onPress={() => navigation.navigate('Entrega',{loja})}/>
            </View>
            <BackButton />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        width: '100%',
    },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        marginBottom: 30,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    previewContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImageContainer: {
        width: '60%',
        height: 250,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewText: {
        fontSize: 16,
        marginBottom: 20,
    },
    previewImage: {
        width: '50%',
        height: '100%',
        resizeMode: 'contain',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        backgroundColor: '#fff', 
        borderRadius: 10, 
        padding: 10, 
        shadowColor: '#000',
    },
    quantityButton: {
        backgroundColor: '#007bff',
        padding: 7,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    quantityText: {
        fontSize: 20,
    },
    quantityLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    pickerContainer: {
        flexDirection:'row',
        marginTop: 6,
        backgroundColor: '#fff', 
        borderRadius: 10, 
        paddingHorizontal: 5, 
        shadowColor: '#000',
        alignItems: 'center',
    },
    pickerLabel: {
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '50%',

    },
    buttonNext:{
        marginTop: 30,
        marginBottom:28,
        width: '50%',
    }
});

export default BodyPrint;