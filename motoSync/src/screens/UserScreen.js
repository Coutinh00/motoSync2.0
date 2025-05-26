import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

const usersData = [
  { id: '1', name: 'Alex Silva', email: 'alex.silva@email.com', cpf: '123.456.789-00', phone: '(11) 91234-5678', filial: 'Butantã-1', status: 'Ativo', role: 'Usuário' },
  { id: '2', name: 'Bruna Costa', email: 'bruna.costa@email.com', cpf: '345.678.901-23', phone: '(11) 91234-5678', filial: 'Butantã-1', status: 'Pendente', role: 'Usuário' },
  { id: '3', name: 'Caio Moreira', email: 'caio.moreira@email.com', cpf: '345.678.901-23', phone: '(11) 91234-5678', filial: 'Butantã-1', status: 'Ativo', role: 'Admin' },
];

const UserScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      {/* User Icon Placeholder */}
      <View style={styles.userIconPlaceholder}>
        <Feather name="user" size={30} color="gray" />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userContact}>{item.email}</Text>
        <Text style={styles.userContact}>CPF: {item.cpf}</Text>
        <Text style={styles.userContact}>{item.phone}</Text>
        <Text style={styles.userContact}>Filial: {item.filial}</Text>
      </View>
      <View style={styles.userActions}>
         <View style={styles.statusRoleContainer}>
            {item.status === 'Ativo' && <Text style={[styles.statusBadge, styles.statusAtivo]}>{item.status}</Text>}
            {item.status === 'Pendente' && <Text style={[styles.statusBadge, styles.statusPendente]}>{item.status}</Text>}
             {item.role === 'Admin' && <Text style={[styles.statusBadge, styles.roleAdmin]}>{item.role}</Text>}
         </View>
        <TouchableOpacity style={styles.editButton} onPress={() => console.log('Editar usuário:', item.id)}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Usuários da filial</Text>
         <Feather name="search" size={24} color="black" />{/* Search Icon in Header */}
      </View>

      {/* Search Bar below Header */}
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* User List */}
      <FlatList
        data={usersData}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Add User Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Adicionar usuário')}>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
   searchIcon: {
     marginRight: 10,
   },
  searchInput: {
    flex: 1,
    height: 40,
  },
  listContent: {
    paddingBottom: 80,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userContact: {
    fontSize: 14,
    color: 'gray',
  },
  userActions: {
    alignItems: 'flex-end',
  },
   statusRoleContainer: {
     flexDirection: 'row',
     marginBottom: 5,
   },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  statusAtivo: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  statusPendente: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  roleAdmin: {
     backgroundColor: '#007BFF',
     color: '#fff',
   },
  editButton: {
    marginTop: 5,
  },
  editButtonText: {
    color: '#007BFF',
    fontSize: 14,
  },
   addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default UserScreen; 