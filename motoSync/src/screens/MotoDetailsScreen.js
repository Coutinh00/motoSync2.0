import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const MotoDetailsScreen = ({ route, navigation }) => {
  const { moto } = route.params;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteMoto = () => {
    // Implementar lógica de exclusão aqui
    console.log('Delete moto:', moto.id);
    setShowDeleteModal(false);
    // Navegar de volta para a lista após excluir
    navigation.goBack();
  };

  const handleEditMoto = () => {
    // Implementar lógica de edição aqui
    console.log('Edit moto:', moto.id);
    // Navegar para a tela de edição, passando os dados da moto
    navigation.navigate('EditMoto', { moto: moto });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da motocicleta</Text>
        <TouchableOpacity onPress={handleEditMoto}>
           <Feather name="edit" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>

        {/* Moto Details */}
        <View style={styles.detailsCard}>
          <View style={styles.titleRow}>
            <Text style={styles.detailTitle}>{moto.model}</Text>
            <View style={styles.statusContainer}>
              <MaterialCommunityIcons name="lightning-bolt" size={16} color="#ffffff" />
              <Text style={[styles.motoStatus, moto.status === 'Prontas' && styles.statusProntas, moto.status === 'Dano Leve' && styles.statusDanoLeve, moto.status === 'Dano Grave' && styles.statusDanoGrave]}>{moto.status}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plate:</Text>
            <Text style={styles.detailValue}>{moto.plate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Chassi:</Text>
            <Text style={styles.detailValue}>{moto.chassis}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>RFID Tag:</Text>
            <Text style={styles.detailValue}>{moto.rfid}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>IOT Tag:</Text>
            <Text style={styles.detailValue}>IOT-2048</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Local:</Text>
            <Text style={styles.detailValue}>{moto.location}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Filial:</Text>
            <Text style={styles.detailValue}>{moto.filial}</Text>
          </View>

          {/* Notas atuais */}
          <Text style={styles.notesTitle}>Notas atuais</Text>
          <View style={styles.notesContainer}>
            <Text style={styles.notesText}>Óleo trocado; rodízio de pneus agendado para a próxima semana.</Text>
          </View>

          {/* Criado por */}
          <View style={styles.createdByContainer}>
            <Text style={styles.createdBy}>Criado por</Text>
            <View style={styles.createdByRow}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="account" size={20} color="#6B7280" />
              </View>
              <Text style={styles.createdByEmail}>lucas.andrade@moto.com</Text>
            </View>
          </View>

          {/* Última atualização */}
          <View style={styles.lastUpdatedContainer}>
            <Text style={styles.lastUpdated}>Última atualização</Text>
            <Text style={styles.lastUpdatedDate}>12/04/2025 15:42</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditMoto}>
          <Text style={styles.editButtonText}>Editar moto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
          <Text style={styles.deleteButtonText}>Excluir moto</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialCommunityIcons name="alert-triangle" size={40} color="#EF4444" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Excluir motocicleta?</Text>
            <Text style={styles.modalMessage}>Tem certeza de que deseja excluir esta motocicleta? Esta ação não pode ser desfeita.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalDeleteButton} onPress={handleDeleteMoto}>
                <Text style={styles.modalDeleteButtonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#6B7280',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9CA3AF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  motoStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  statusProntas: {
    backgroundColor: '#10B981',
  },
  statusDanoLeve: {
    backgroundColor: '#F59E0B',
  },
  statusDanoGrave: {
    backgroundColor: '#EF4444',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  notesTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 20,
    marginBottom: 8,
  },
  notesContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  createdByContainer: {
    marginBottom: 16,
  },
  createdBy: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  createdByRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  createdByEmail: {
    fontSize: 14,
    color: '#1F2937',
  },
  lastUpdatedContainer: {
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  lastUpdatedDate: {
    fontSize: 14,
    color: '#1F2937',
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalDeleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  modalDeleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCancelButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginLeft: 8,
  },
  modalCancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MotoDetailsScreen; 