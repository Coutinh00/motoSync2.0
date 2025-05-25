import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const motosData = [
  { id: '1', plate: 'ABC-1234', model: 'Mottu POP', chassis: '2KDJ3LPD9', rfid: '1938402011', status: 'Prontas', location: 'Brasil, São Paulo', filial: 'Butantã-1' },
  { id: '2', plate: 'XYZ5678', model: 'Mottu Sport 110i', chassis: '2KDJ3LPD9', rfid: '291003284013', status: 'Dano Leve', location: 'Brasil, São Paulo', filial: 'Butantã-1' },
  { id: '3', plate: 'LMN4321', model: 'Mottu-e', chassis: 'WB30G3105KRA49219', rfid: '843920130002', status: 'Dano Grave', location: 'Brasil, São Paulo', filial: 'Osasco-3' },
  { id: '4', plate: 'DEF5679', model: 'Mottu-e', chassis: '9C2JA4120CR456789', rfid: '120398120038', status: 'Dano Leve', location: 'México, Cidade do
México', filial: 'Butantã-1' },
  { id: '5', plate: 'JDAS91', model: 'Mottu-e', chassis: 'MLHNC5140F5302324', rfid: '238472983411', status: 'Dano Leve', location: 'México, Cidade do
México', filial: 'Butantã-1' },
];

const FleetScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const renderMotoItem = ({ item }) => (
    <View style={styles.motoItem}>
      <View style={styles.motoInfo}>
        <Text style={styles.motoPlate}>{item.plate}</Text>
        <Text>{item.model}</Text>
        <Text>Chassis: {item.chassis}</Text>
        <Text>RFID: {item.rfid}</Text>
      </View>
      <View style={styles.motoStatusContainer}>
        <Text style={[styles.motoStatus, item.status === 'Prontas' && styles.statusProntas, item.status === 'Dano Leve' && styles.statusDanoLeve, item.status === 'Dano Grave' && styles.statusDanoGrave]}>{item.status}</Text>
        <View style={styles.motoLocation}>
          <Feather name="map-pin" size={14} color="gray" />
          <Text style={styles.motoLocationText}>{item.location}\n{item.filial}</Text>
        </View>
        <TouchableOpacity style={styles.verDetalhesButton} onPress={() => navigation.navigate('MotoDetails', { moto: item })}>
          <Text style={styles.verDetalhesButtonText}>Ver detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} color="black" />
        <Text style={styles.headerTitle}>Listar motos</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by model, plate, or status"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Moto List */}
      <FlatList
        data={motosData}
        renderItem={renderMotoItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Add Moto Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddMoto')}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    padding: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  motoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  motoInfo: {
    flex: 1,
  },
  motoPlate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  motoStatusContainer: {
    alignItems: 'flex-end',
  },
  motoStatus: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
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
  motoLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  motoLocationText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5,
  },
  verDetalhesButton: {
    marginTop: 5,
  },
  verDetalhesButtonText: {
    color: '#007BFF',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default FleetScreen; 