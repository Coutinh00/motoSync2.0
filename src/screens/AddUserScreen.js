import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { userService } from '../services/api';
import { userListStorage } from '../services/storage';
import { validateUser } from '../services/validation';
import LoadingSpinner from '../components/LoadingSpinner';

const AddUserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [filial, setFilial] = useState('');
  const [role, setRole] = useState('Usuário');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSaveUser = async () => {
    // Limpar erros anteriores
    setErrors({});

    const userData = {
      name,
      email,
      cpf,
      phone,
      filial,
      role,
      status: 'Pendente', // Novo usuário sempre começa como pendente
    };

    // Validação dos campos
    const validation = await validateUser(userData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      // Tentar salvar na API
      const newUser = await userService.create(userData);
      
      // Salvar no AsyncStorage também
      await userListStorage.addUser(newUser);
      
      Alert.alert('Sucesso', 'Usuário adicionado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      // Se a API falhar, salvar apenas localmente
      const localUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };
      
      await userListStorage.addUser(localUser);
      
      Alert.alert('Sucesso', 'Usuário adicionado localmente!', [
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
        <Text style={styles.headerTitle}>Adicionar novo usuário</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput 
          style={[styles.input, errors.name && styles.inputError]} 
          value={name} 
          onChangeText={setName}
          placeholder="Nome completo"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Email *</Text>
        <TextInput 
          style={[styles.input, errors.email && styles.inputError]} 
          value={email} 
          onChangeText={setEmail}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>CPF</Text>
        <TextInput 
          style={[styles.input, errors.cpf && styles.inputError]} 
          value={cpf} 
          onChangeText={setCpf}
          placeholder="000.000.000-00"
        />
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

        <Text style={styles.label}>Telefone</Text>
        <TextInput 
          style={[styles.input, errors.phone && styles.inputError]} 
          value={phone} 
          onChangeText={setPhone}
          placeholder="(11) 99999-9999"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <Text style={styles.label}>Filial *</Text>
        <TextInput 
          style={[styles.input, errors.filial && styles.inputError]} 
          value={filial} 
          onChangeText={setFilial}
          placeholder="Butantã-1"
        />
        {errors.filial && <Text style={styles.errorText}>{errors.filial}</Text>}

        <Text style={styles.label}>Função</Text>
        <TextInput 
          style={styles.input} 
          value={role} 
          onChangeText={setRole}
          placeholder="Usuário"
        />

        <TouchableOpacity 
          style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
          onPress={handleSaveUser}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Salvando...' : 'Salvar usuário'}
          </Text>
        </TouchableOpacity>
      </View>

      <LoadingSpinner visible={loading} message="Salvando usuário..." />
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

export default AddUserScreen; 