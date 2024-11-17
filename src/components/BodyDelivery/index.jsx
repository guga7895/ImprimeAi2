import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';
import BackButton from '../BackButton/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import opcoesAgendamento from '../../data/opcoesAgendamento.json'; // Import the JSON file
import opcoesEntrega from '../../data/opcoesEntrega.json'; // Import the JSON file

const filePath = FileSystem.documentDirectory + 'requests.json';

const BodyDelivery = ({ loja, quantity, user, document }) => {
    const [opcaoAgendamento, setOpcaoAgendamento] = useState('Agendar impressão');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [opcaoEntrega, setOpcaoEntrega] = useState('');
    const [endereco, setEndereco] = useState('');
    const navigation = useNavigation();
    const [jsonData, setJsonData] = useState([]); 

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode === 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            setShow(Platform.OS !== 'ios'); // to show time
        } else {
            const selectedTime = selectedValue || new Date();
            setTime(selectedTime);
            setShow(Platform.OS === 'ios'); // to hide back the picker
            setMode('date'); // defaulting to date for next open
            setDateSelected(true);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const readJsonFile = async () => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(filePath);
            if (!fileInfo.exists) {
                return [];
            }
            const json = await FileSystem.readAsStringAsync(filePath);
            return JSON.parse(json);
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return [];
        }
    };

    const writeJsonFile = async (data) => {
        try {
            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
        } catch (error) {
            console.error('Error writing JSON file:', error);
        }
    };

    const addData = async (loja, opcaoEntrega, endereco, user, data, document) => {
        console.log('addData - loja:', loja); // Debugging log
      
        const jsonData = await readJsonFile();
      
        const newId = jsonData.length + 1;
      
        // Copy the document to a persistent location
        const documentName = document.uri.split('/').pop();
        const newDocumentPath = FileSystem.documentDirectory + documentName;
      
        try {
          await FileSystem.copyAsync({
            from: document.uri,
            to: newDocumentPath,
          });
        } catch (error) {
          console.error('Error copying document:', error);
          Alert.alert('Error', 'Failed to copy document');
          return;
        }
      
        const newItem = [
          { "label": "ID", "value": newId.toString() },
          { "label": "Loja", "value": loja.nomeLoja },
          { "label": "Quantidade", "value": quantity },
          { "label": "Email", "value": user.email },
          { "label": "Data", "value": data },
          { "label": "Documento", "value": newDocumentPath } // Include the document path
        ];
      
        jsonData.push(newItem);
      
        await writeJsonFile(jsonData);
      
        setJsonData(jsonData);
      };

    const handleNext = async () => {
        const data = `${date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })} ${time.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`; // Convert date and time to BRT
        if (opcaoEntrega === 'Entregar na minha casa') {
            navigation.navigate('Delivery', { loja, opcaoEntrega, endereco, quantity, user, data, document });
        } else if (opcaoEntrega === 'Irei buscar a impressão') {
            await addData(loja, opcaoEntrega, endereco, user, data, document, quantity);
            navigation.navigate('Home', { user });
        }
    };

    const formatDate = (date, time) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
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
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.datePickerButton}>{dateSelected ? "Alterar Data e Hora" : "Selecionar Data e Hora"}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            value={date}
                            minimumDate={new Date()}
                            display="default"
                            mode={mode}
                            onChange={onChange}
                        />
                    )}
                    {dateSelected && (
                        <View style={styles.dateShowerContainer}>
                            <Text style={styles.dateText}>Data e Hora: {formatDate(date, time)}</Text>
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
    datePickerButton: {
        fontSize: 16,
        color: '#007AFF',
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
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