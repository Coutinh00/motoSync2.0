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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da motocicleta</Text>
        <TouchableOpacity onPress={handleEditMoto}>
           <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Moto Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailTitle}>{moto.model}</Text>
         <View style={styles.statusContainer}>
           <Text style={[styles.motoStatus, moto.status === 'Prontas' && styles.statusProntas, moto.status === 'Dano Leve' && styles.statusDanoLeve, moto.status === 'Dano Grave' && styles.statusDanoGrave]}>{moto.status}</Text>
        </View>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Plate:</Text> {moto.plate}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Chassi:</Text> {moto.chassis}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>RFID Tag:</Text> {moto.rfid}</Text>
         {/* Adicionar mais detalhes conforme a imagem */}
         <Text style={styles.detailText}><Text style={styles.detailLabel}>IOT Tag:</Text> IOT-2048</Text>
         <Text style={styles.detailText}><Text style={styles.detailLabel}>Local:</Text> {moto.location}</Text>
         <Text style={styles.detailText}><Text style={styles.detailLabel}>Filial:</Text> {moto.filial}</Text>

         {/* Notas atuais */}
         <Text style={styles.notesTitle}>Notas atuais</Text>
         <View style={styles.notesContainer}>
            <Text style={styles.notesText}>Óleo trocado; rodízio de pneus agendado para a próxima semana.</Text>
         </View>

         {/* Criado por */}
         <Text style={styles.createdBy}>Criado por</Text>
         <Text style={styles.createdByEmail}>lucas.andrade@moto.com</Text>
         {/* Última atualização */}
         <Text style={styles.lastUpdated}>Última atualização</Text>
         <Text style={styles.lastUpdatedDate}>12/04/2025 15:42</Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditMoto}>
        <Text style={styles.editButtonText}>Editar moto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
        <Text style={styles.deleteButtonText}>Excluir moto</Text>
      </TouchableOpacity>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialCommunityIcons name="alert-circle-outline" size={40} color="red" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Excluir motocicleta?</Text>
            <Text style={styles.modalMessage}>Tem certeza de que deseja excluir esta motocicleta? Esta ação não pode ser desfeita.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalDeleteButton} onPress={handleDeleteMoto}>
                <Text style={[styles.modalButtonText, styles.modalDeleteButtonText]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
   statusContainer: {
     position: 'absolute',
     top: 15,
     right: 15,
   },
  motoStatus: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
   statusProntas: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  statusDanoLeve: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  statusDanoGrave: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
   notesContainer: {
     backgroundColor: '#f9f9f9',
     borderRadius: 5,
     padding: 10,
     marginBottom: 15,
   },
  notesText: {
    fontSize: 14,
    color: 'gray',
  },
  createdBy: {
     fontSize: 12,
     color: 'gray',
     marginTop: 10,
  },
   createdByEmail: {
     fontSize: 14,
     marginBottom: 5,
   },
  lastUpdated: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  lastUpdatedDate: {
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
   modalIcon: {
     marginBottom: 10,
   },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
   modalCancelButton: {
     padding: 10,
     borderRadius: 5,
     minWidth: 100,
     alignItems: 'center',
     borderColor: '#ccc',
     borderWidth: 1,
   },
   modalDeleteButton: {
     backgroundColor: '#DC3545',
     padding: 10,
     borderRadius: 5,
     minWidth: 100,
     alignItems: 'center',
     marginLeft: 10,
   },
   modalButtonText: {
     fontSize: 16,
     fontWeight: 'bold',
     color: '#000',
   },
   modalDeleteButtonText: {
     color: '#fff',
   },
});

export default MotoDetailsScreen; 