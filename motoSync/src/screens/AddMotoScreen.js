import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AddMotoScreen = ({ navigation }) => {
  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');
  const [chassis, setChassis] = useState('');
  const [rfid, setRfid] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [filial, setFilial] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveMoto = () => {
    // Implementar lógica para salvar a nova moto
    const newMoto = {
      id: Date.now().toString(), // Gerar um ID simples (melhorar em uma aplicação real)
      plate,
      model,
      chassis,
      rfid,
      status,
      location,
      filial,
      notes,
    };
    console.log('Nova moto a ser salva:', newMoto);
    // Aqui você chamaria uma função para adicionar a moto à lista na tela anterior
    // navigation.navigate('Fleet', { newMoto: newMoto }); // Exemplo de como passar dados de volta
    navigation.goBack(); // Voltar para a tela anterior após salvar (temporário)
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar nova moto</Text>
        <View style={{ width: 24 }} />{/* Spacer */}
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Plate</Text>
        <TextInput style={styles.input} value={plate} onChangeText={setPlate} />

        <Text style={styles.label}>Model</Text>
        <TextInput style={styles.input} value={model} onChangeText={setModel} />

        <Text style={styles.label}>Chassis</Text>
        <TextInput style={styles.input} value={chassis} onChangeText={setChassis} />

        <Text style={styles.label}>RFID Tag</Text>
        <TextInput style={styles.input} value={rfid} onChangeText={setRfid} />

        <Text style={styles.label}>Status</Text>
        <TextInput style={styles.input} value={status} onChangeText={setStatus} />

        <Text style={styles.label}>Local</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Filial</Text>
        <TextInput style={styles.input} value={filial} onChangeText={setFilial} />

        <Text style={styles.label}>Notas</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMoto}>
          <Text style={styles.saveButtonText}>Salvar moto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddMotoScreen; 