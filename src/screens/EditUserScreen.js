import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

const EditUserScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteUser = () => {
    // Lógica para excluir o usuário com o userId
    console.log('Excluindo usuário com ID:', userId);
    // Após exclusão, navegar de volta para a tela de listagem de usuários
    setShowDeleteModal(false);
    navigation.goBack();
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

      {/* Formulário de Edição (placeholder) */}
      <View style={styles.formContainer}>
        <Text>Campos de edição do usuário aqui...</Text>
        {/* Exemplo de campo: */}
        {/* <TextInput placeholder="Nome completo" style={styles.input} /> */}
        {/* <TextInput placeholder="Email" style={styles.input} /> */}
        {/* ... outros campos (CPF, Telefone, Filial, Senha) ... */}
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Salvar alterações do usuário', userId)}>
          <Text style={styles.saveButtonText}>Salvar</Text>
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
});

export default EditUserScreen; 