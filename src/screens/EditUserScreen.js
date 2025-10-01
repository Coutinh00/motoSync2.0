import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { userService } from '../services/api';
import { userListStorage } from '../services/storage';
import { validateUser } from '../services/validation';
import LoadingSpinner from '../components/LoadingSpinner';

const EditUserScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cpf, setCpf] = useState(user.cpf || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [filial, setFilial] = useState(user.filial);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

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
      status,
    };

    // Validação dos campos
    const validation = await validateUser(userData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      // Tentar atualizar na API
      const updatedUser = await userService.update(user.id, userData);
      
      // Atualizar no AsyncStorage também
      await userListStorage.updateUser(user.id, updatedUser);
      
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      // Se a API falhar, atualizar apenas localmente
      const localUser = {
        ...user,
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      
      await userListStorage.updateUser(user.id, localUser);
      
      Alert.alert('Sucesso', 'Usuário atualizado localmente!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await userService.delete(user.id);
      await userListStorage.removeUser(user.id);
      setShowDeleteModal(false);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao excluir usuário: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar usuário</Text>
        {/* Pode adicionar ícone de salvar aqui se necessário */}
        <View style={{ width: 24 }} />{/* Espaço reservado para alinhar o título */}
      </View>

      {/* Formulário de Edição */}
      <ScrollView style={styles.formContainer}>
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

        <Text style={styles.label}>Status</Text>
        <TextInput 
          style={styles.input} 
          value={status} 
          onChangeText={setStatus}
          placeholder="Ativo, Pendente"
        />
      </ScrollView>

      {/* Botões de Ação */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
          onPress={handleSaveUser}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
          <Text style={styles.deleteButtonText}>Deletar usuário</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AntDesign name="warning" size={40} color="red" style={styles.warningIcon} />
            <Text style={styles.modalTitle}>Deseja excluir um usuário?</Text>
            <Text style={styles.modalMessage}>Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonExcluir} onPress={handleDeleteUser}>
                <Text style={styles.modalButtonTextExcluir}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonCancelar} onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.modalButtonTextCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <LoadingSpinner visible={loading} message="Processando..." />
    </View>
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
  formContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  actionButtonsContainer: {
    // Estilos para posicionar os botões, se necessário
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#DC3545',
    borderWidth: 1,
  },
  deleteButtonText: {
    color: '#DC3545',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  warningIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButtonExcluir: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  modalButtonTextExcluir: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonCancelar: {
    backgroundColor: '#6C757D', // Um cinza para o cancelar, pode ajustar a cor conforme a imagem se for diferente
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  modalButtonTextCancelar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default EditUserScreen; 