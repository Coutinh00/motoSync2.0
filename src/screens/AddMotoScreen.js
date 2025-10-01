import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { motoService } from '../services/api';
import { motoStorage } from '../services/storage';
import { validateMoto } from '../services/validation';
import { useTheme } from '../contexts/ThemeContext';
import { Button, FormField, Dropdown, LoadingSpinner } from '../components';

const AddMotoScreen = ({ navigation }) => {
  const [plate, setPlate] = useState('ABC-1234');
  const [model, setModel] = useState('');
  const [chassis, setChassis] = useState('');
  const [rfid, setRfid] = useState('');
  const [iotTag, setIotTag] = useState('');
  const [status, setStatus] = useState('Dano Leve');
  const [location, setLocation] = useState('');
  const [filial, setFilial] = useState('São paulo-01');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const theme = useTheme();

  const statusOptions = [
    { value: 'Prontas', label: 'Prontas' },
    { value: 'Dano Leve', label: 'Dano Leve' },
    { value: 'Dano Grave', label: 'Dano Grave' },
  ];

  const filialOptions = [
    { value: 'São paulo-01', label: 'São paulo-01' },
    { value: 'São paulo-02', label: 'São paulo-02' },
    { value: 'Rio de Janeiro-01', label: 'Rio de Janeiro-01' },
    { value: 'Belo Horizonte-01', label: 'Belo Horizonte-01' },
  ];

  const handleSaveMoto = async () => {
    // Limpar erros anteriores
    setErrors({});

    const motoData = {
      plate,
      model,
      chassis,
      rfid,
      iotTag,
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
      // Tentar salvar na API
      const newMoto = await motoService.create(motoData);
      
      // Salvar no AsyncStorage também
      await motoStorage.addMoto(newMoto);
      
      Alert.alert('Sucesso', 'Moto cadastrada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      // Se a API falhar, salvar apenas localmente
      const localMoto = {
        id: Date.now().toString(),
        ...motoData,
        createdAt: new Date().toISOString(),
      };
      
      await motoStorage.addMoto(localMoto);
      
      Alert.alert('Sucesso', 'Moto cadastrada localmente!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastrar motocicleta</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Informações sobre motocicletas</Text>
            
            <View style={styles.formCard}>
              {/* Modelo */}
              <FormField
                label="Modelo"
                placeholder="Insira o modelo da motocicleta"
                value={model}
                onChangeText={setModel}
                error={errors.model}
              />

              {/* Placa */}
              <FormField
                label="Placa"
                placeholder="ABC-1234"
                value={plate}
                onChangeText={setPlate}
                error={errors.plate}
              />

              {/* Número do Chassi */}
              <FormField
                label="Número do Chassi"
                placeholder="Digite o número do chassi"
                value={chassis}
                onChangeText={setChassis}
                error={errors.chassis}
              />

              {/* Estado atual */}
              <Dropdown
                label="Estado atual"
                value={status}
                onValueChange={setStatus}
                options={statusOptions}
                placeholder="Selecione o estado"
                error={errors.status}
              />

              {/* RFID Tag */}
              <View style={styles.rfidContainer}>
                <FormField
                  label="RFID Tag"
                  placeholder="Código"
                  value={rfid}
                  onChangeText={setRfid}
                  error={errors.rfid}
                  style={styles.rfidInput}
                />
                <View style={styles.rfidButtons}>
                  <TouchableOpacity style={styles.scanButton}>
                    <MaterialCommunityIcons name="qrcode-scan" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.scanButton}>
                    <MaterialCommunityIcons name="qrcode-scan" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* IoT Tag */}
              <View style={styles.iotContainer}>
                <FormField
                  label="IoT Tag (Opcional)"
                  placeholder="Preencher automaticamente ou escanear"
                  value={iotTag}
                  onChangeText={setIotTag}
                  error={errors.iotTag}
                  style={styles.iotInput}
                />
                <TouchableOpacity style={styles.qrButton}>
                  <MaterialCommunityIcons name="qrcode" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Localização na filial */}
              <FormField
                label="Localização na filial"
                placeholder="E.g. Estacionamento A"
                value={location}
                onChangeText={setLocation}
                error={errors.location}
              />

              {/* Filial */}
              <Dropdown
                label="Filial"
                value={filial}
                onValueChange={setFilial}
                options={filialOptions}
                placeholder="Selecione a filial"
                error={errors.filial}
              />

              {/* Notas */}
              <FormField
                label="Notas (Opcional)"
                placeholder="Detalhes adicionais..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                style={styles.notesInput}
              />

              {/* Botão Cadastrar */}
              <Button
                title="Cadastrar"
                onPress={handleSaveMoto}
                disabled={loading}
                variant={loading ? 'disabled' : 'primary'}
                style={styles.cadastrarButton}
              />
            </View>
          </View>
        </ScrollView>

        <LoadingSpinner visible={loading} message="Cadastrando moto..." />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rfidContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  rfidInput: {
    flex: 1,
    marginRight: 8,
  },
  rfidButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  scanButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  iotInput: {
    flex: 1,
    marginRight: 8,
  },
  qrButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  cadastrarButton: {
    marginTop: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
  },
});

export default AddMotoScreen; 