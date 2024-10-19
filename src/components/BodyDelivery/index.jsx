import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';
import BackButton from '../BackButton/index';
import opcoesAgendamento from '../../data/opcoesAgendamento.json';
import opcoesEntrega from '../../data/opcoesEntrega.json';
import DateTimePicker from '@react-native-community/datetimepicker';

const BodyDelivery = ({ loja, quantity, user, document }) => {
    const [opcaoAgendamento, setOpcaoAgendamento] = useState('Agendar impressão');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [opcaoEntrega, setOpcaoEntrega] = useState('');
    const [endereco, setEndereco] = useState('');
    const navigation = useNavigation();

    const onChange = (event, selectedDate) => {
        console.log(user);
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        setDateSelected(true);
    };

    const handleNext = () => {
        const data = date.toString(); // Convert date to string
        if (opcaoEntrega === 'Entregar na minha casa') {
            navigation.navigate('Delivery', { loja, opcaoEntrega, endereco, quantity, user, data, document });
        } else if (opcaoEntrega === 'Irei buscar a impressão') {
            navigation.navigate('Not Delivery', { loja, opcaoEntrega, endereco, quantity, user });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleLabel}> Por favor, insira os detalhes da sua entrega.</Text>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de impressão</Text>
                <Picker
                    selectedValue={opcaoAgendamento}
                    onValueChange={(itemValue) => setOpcaoAgendamento(itemValue)}
                    style={styles.picker}
                >
                    {opcoesAgendamento.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            {opcaoAgendamento === 'Agendar impressão' && (
                <View style={styles.dateContainer}>
                    <Button style={styles.datePickerButton} onPress={() => setShowDatePicker(true)} title={dateSelected ? "Alterar Data" : "Selecionar Data"} />
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    {dateSelected && (
                        <View style={styles.dateShowerContainer}>
                            <Text style={styles.dateText}>Data selecionada: {date.toLocaleDateString()}</Text>
                        </View>
                    )}
                </View>
            )}
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de entrega</Text>
                <Picker
                    selectedValue={opcaoEntrega}
                    onValueChange={(itemValue) => setOpcaoEntrega(itemValue)}
                    style={styles.picker}
                >
                    {opcoesEntrega.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            {opcaoEntrega === 'Entregar na minha casa' && (
                <View style={styles.addressContainer}>
                    <TextInput 
                        placeholder="Insira o seu endereço"  
                        style={styles.addressInput}
                        value={endereco}
                        onChangeText={setEndereco} 
                    />
                    <Button title="Confirmar" />
                </View>
            )}
            <View style={styles.buttonNext}>
                <Button color="green" title="Avançar" onPress={handleNext} />
            </View>
            <BackButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        width: '100%'
    },
    datePickerButton: {},
    titleLabel: {
        marginBottom: 18,
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        textAlign: 'left',
    },
    pickerContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 4,
        backgroundColor: '#fff', 
        borderRadius: 10, 
        paddingHorizontal: 5, 
        shadowColor: '#000',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        borderRadius: 10, 
        paddingHorizontal: 5, 
        paddingVertical: 5,
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
    dateShowerContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        alignItems: 'center',
        marginLeft: 16,
    },
    dateText: {
        fontSize: 14,
    },
    addressContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff', 
        borderRadius: 10, 
        paddingHorizontal: 5, 
        paddingVertical: 5,
        width: '80%',
        shadowColor: '#000',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 6,
    },
    addressInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    buttonNext: {
        marginTop: 30,
        marginBottom: 28,
        width: '50%',
    }
});

export default BodyDelivery;