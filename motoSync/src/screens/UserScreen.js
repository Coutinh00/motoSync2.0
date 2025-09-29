import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { userService } from '../services/api';
import { userListStorage } from '../services/storage';
import { syncUsers, syncUser } from '../services/syncService';
import { SyncStatus } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';

const usersData = [
  { id: '1', name: 'Alex Silva', email: 'alex.silva@email.com', cpf: '123.456.789-00', phone: '(11) 91234-5678', filial: 'Butantã-1', status: 'Ativo', role: 'Usuário' },
  { id: '2', name: 'Bruna Costa', email: 'bruna.costa@email.com', cpf: '345.678.901-23', phone: '(11) 91234-5678', filial: 'Butantã-1', status: 'Pendente', role: 'Usuário' },
  { id: '3', name: 'Caio Moreira', email: 'caio.moreira@email.com', cpf: '345.678.901-23', phone: '(11) 91234-5678', filial: 'Butantã-1', status: 'Ativo', role: 'Admin' },
];

const UserScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Carregar usuários ao montar o componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Recarregar usuários quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      loadUsers();
    }, [])
  );

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Usar serviço de sincronização
      const syncedUsers = await syncUsers();
      setUsers(syncedUsers);
    } catch (error) {
      console.log('Erro na sincronização, usando dados locais:', error.message);
      // Se a sincronização falhar, usar dados do AsyncStorage
      const localUsers = await userListStorage.getUsers();
      if (localUsers.length > 0) {
        setUsers(localUsers);
      } else {
        // Se não houver dados locais, usar dados mock
        setUsers(usersData);
        await userListStorage.saveUsers(usersData);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const handleDeleteUser = async (userId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await userService.delete(userId);
              await userListStorage.removeUser(userId);
              setUsers(prev => prev.filter(user => user.id !== userId));
              Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao excluir usuário: ' + error.message);
            }
          }
        }
      ]
    );
  };

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
        <View style={styles.userActions}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => navigation.navigate('EditUser', { user: item })}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => handleDeleteUser(item.id)}
          >
            <Feather name="trash-2" size={16} color="#dc3545" />
          </TouchableOpacity>
        </View>
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

      {/* Sync Status */}
      <SyncStatus 
        onSync={(result) => {
          if (result.success) {
            loadUsers(); // Recarregar usuários após sincronização
          }
        }}
        style={styles.syncStatus}
      />

      {/* User List */}
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
          </View>
        }
      />

      {/* Add User Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddUser')}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <LoadingSpinner visible={loading} message="Carregando usuários..." />
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
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  syncStatus: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default UserScreen; 