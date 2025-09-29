import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { motoService } from '../services/api';
import { motoStorage } from '../services/storage';
import { validateMoto } from '../services/validation';
import LoadingSpinner from '../components/LoadingSpinner';

const EditMotoScreen = ({ route, navigation }) => {
  const { moto } = route.params;

  const [plate, setPlate] = useState(moto.plate);
  const [model, setModel] = useState(moto.model);
  const [chassis, setChassis] = useState(moto.chassis);
  const [rfid, setRfid] = useState(moto.rfid);
  const [status, setStatus] = useState(moto.status);
  const [location, setLocation] = useState(moto.location);
  const [filial, setFilial] = useState(moto.filial);
  const [notes, setNotes] = useState(moto.notes || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSaveMoto = async () => {
    // Limpar erros anteriores
    setErrors({});

    const motoData = {
      plate,
      model,
      chassis,
      rfid,
      status,
      location,
      filial,
      notes,
    };

    // Validação dos campos
    const validation = await validateMoto(motoData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      // Tentar atualizar na API
      const updatedMoto = await motoService.update(moto.id, motoData);
      
      // Atualizar no AsyncStorage também
      await motoStorage.updateMoto(moto.id, updatedMoto);
      
      Alert.alert('Sucesso', 'Moto atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      // Se a API falhar, atualizar apenas localmente
      const localMoto = {
        ...moto,
        ...motoData,
        updatedAt: new Date().toISOString(),
      };
      
      await motoStorage.updateMoto(moto.id, localMoto);
      
      Alert.alert('Sucesso', 'Moto atualizada localmente!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar moto</Text>
        <View style={{ width: 24 }} />{/* Spacer */}
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Placa *</Text>
        <TextInput 
          style={[styles.input, errors.plate && styles.inputError]} 
          value={plate} 
          onChangeText={setPlate}
          placeholder="ABC-1234"
        />
        {errors.plate && <Text style={styles.errorText}>{errors.plate}</Text>}

        <Text style={styles.label}>Modelo *</Text>
        <TextInput 
          style={[styles.input, errors.model && styles.inputError]} 
          value={model} 
          onChangeText={setModel}
          placeholder="Mottu POP"
        />
        {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}

        <Text style={styles.label}>Chassis *</Text>
        <TextInput 
          style={[styles.input, errors.chassis && styles.inputError]} 
          value={chassis} 
          onChangeText={setChassis}
          placeholder="2KDJ3LPD9"
        />
        {errors.chassis && <Text style={styles.errorText}>{errors.chassis}</Text>}

        <Text style={styles.label}>RFID Tag *</Text>
        <TextInput 
          style={[styles.input, errors.rfid && styles.inputError]} 
          value={rfid} 
          onChangeText={setRfid}
          placeholder="1938402011"
        />
        {errors.rfid && <Text style={styles.errorText}>{errors.rfid}</Text>}

        <Text style={styles.label}>Status *</Text>
        <TextInput 
          style={[styles.input, errors.status && styles.inputError]} 
          value={status} 
          onChangeText={setStatus}
          placeholder="Prontas, Dano Leve, Dano Grave"
        />
        {errors.status && <Text style={styles.errorText}>{errors.status}</Text>}

        <Text style={styles.label}>Localização *</Text>
        <TextInput 
          style={[styles.input, errors.location && styles.inputError]} 
          value={location} 
          onChangeText={setLocation}
          placeholder="Brasil, São Paulo"
        />
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

        <Text style={styles.label}>Filial *</Text>
        <TextInput 
          style={[styles.input, errors.filial && styles.inputError]} 
          value={filial} 
          onChangeText={setFilial}
          placeholder="Butantã-1"
        />
        {errors.filial && <Text style={styles.errorText}>{errors.filial}</Text>}

        <Text style={styles.label}>Notas</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          placeholder="Observações adicionais..."
        />

        <TouchableOpacity 
          style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
          onPress={handleSaveMoto}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </Text>
        </TouchableOpacity>
      </View>

      <LoadingSpinner visible={loading} message="Salvando alterações..." />
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
    backgroundColor: '#007BFF',
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
  inputError: {
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default EditMotoScreen; 