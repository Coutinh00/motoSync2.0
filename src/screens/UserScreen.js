import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { userService } from '../services/api';
import { userListStorage } from '../services/storage';
import { syncUsers, syncUser } from '../services/syncService';
import { useTheme } from '../contexts/ThemeContext';
import { ModernCard, AnimatedCard, GradientBackground, StatusBadge } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';
import useResponsive from '../hooks/useResponsive';

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
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const theme = useTheme();
  const { responsiveSize, responsiveFontSize, getPadding } = useResponsive();

  // Carregar usuários ao montar o componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Controlar o toast de sucesso
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

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

  const renderUserItem = ({ item, index }) => (
    <View style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userAvatar}>
          <MaterialCommunityIcons name="account" size={24} color="#000000" />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{item.name}</Text>
            <View style={styles.badgesContainer}>
              <View style={[styles.statusBadge, { backgroundColor: item.status === 'Ativo' ? '#E5E7EB' : '#FEF3C7' }]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
              {item.role === 'Admin' && (
                <View style={[styles.statusBadge, { backgroundColor: '#E5E7EB' }]}>
                  <Text style={styles.badgeText}>{item.role}</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.userEmail}>{item.email}</Text>
          <Text style={styles.userCpf}>CPF: {item.cpf}</Text>
          <Text style={styles.userPhone}>{item.phone}</Text>
          <Text style={styles.userFilial}>Filial: {item.filial}</Text>
        </View>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => navigation.navigate('EditUser', { user: item })}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B7280" />
      
      {/* Header Superior */}
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>Usuários da filial</Text>
      </View>

      {/* Header Principal */}
      <View style={styles.mainHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Usuários da filial</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Lista de Usuários */}
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
          </View>
        }
      />

      {/* Botão Adicionar Usuário */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => {
          setShowSuccessToast(true);
          navigation.navigate('AddUser');
        }}
      >
        <AntDesign name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Success Toast */}
      {showSuccessToast && (
        <View style={styles.successToast}>
          <Feather name="check" size={20} color="#ffffff" />
          <Text style={styles.successToastText}>Usuário registrado com sucesso!</Text>
        </View>
      )}

      <LoadingSpinner visible={loading} message="Carregando usuários..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  topHeader: {
    backgroundColor: '#6B7280',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  topHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userCpf: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userFilial: {
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  editButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successToast: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successToastText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default UserScreen; 