import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { userStorage } from '../services/storage';
import { forceSync, checkSyncStatus } from '../services/syncService';
import { useTheme } from '../contexts/ThemeContext';
import { ModernCard, AnimatedCard, GradientBackground, Button } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';
import useResponsive from '../hooks/useResponsive';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Português');
  const [userData, setUserData] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  
  const theme = useTheme();
  const { responsiveSize, responsiveFontSize, getPadding } = useResponsive();

  // Carregar dados do usuário e status de sincronização
  useEffect(() => {
    loadUserData();
    loadSyncStatus();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await userStorage.getUserData();
      setUserData(user);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const loadSyncStatus = async () => {
    try {
      const status = await checkSyncStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Erro ao carregar status de sincronização:', error);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const result = await forceSync();
      if (result.success) {
        Alert.alert('Sucesso', result.message);
        await loadSyncStatus();
      } else {
        Alert.alert('Erro', result.message);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao sincronizar dados');
    } finally {
      setSyncing(false);
    }
  };

  // Função para logout
  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair da aplicação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await userStorage.logout();
            navigation.navigate('Login');
          }
        }
      ]
    );
  };

  // Função para editar layout da filial
  const handleEditLayout = () => {
    navigation.navigate('CreateBranchLayout');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B7280" />
      
      {/* Header Superior */}
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>Settings</Text>
      </View>

      {/* Header Principal */}
      <View style={styles.mainHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Informações do Usuário */}
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.userAvatar}>
              <MaterialCommunityIcons name="account" size={32} color="#000000" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData?.name || 'Alex Ramires'}</Text>
              <Text style={styles.userEmail}>{userData?.email || 'alex.ramires@email.com'}</Text>
              <Text style={styles.userBranch}>Branch: {userData?.filial || 'São Paulo - Zona Norte'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="chevron-right" size={20} color="#6B7280" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Configurações da Filial */}
        <View style={styles.branchCard}>
          <View style={styles.branchHeader}>
            <MaterialCommunityIcons name="share-variant" size={24} color="#6B7280" />
            <Text style={styles.branchTitle}>Configurações de filial</Text>
          </View>
          
          <Text style={styles.branchInfo}>
            Filial atual: {userData?.filial || 'São Paulo - Zona Norte'}
          </Text>
          
          <TouchableOpacity style={styles.layoutButton} onPress={handleEditLayout}>
            <MaterialCommunityIcons name="grid" size={20} color="#ffffff" />
            <Text style={styles.layoutButtonText}>Editar layout da filial</Text>
          </TouchableOpacity>
          
          <Text style={styles.layoutDescription}>
            Personalize o layout desta filial e organize visualmente áreas como manutenção, estacionamento e vendas
          </Text>
        </View>

        {/* Configurações Gerais */}
        <View style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="bell" size={20} color="#6B7280" />
              <Text style={styles.settingText}>Habilitar notificações</Text>
            </View>
            <Switch
              onValueChange={setIsNotificationsEnabled}
              value={isNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#6B7280' }}
              thumbColor={isNotificationsEnabled ? '#ffffff' : '#ffffff'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="moon" size={20} color="#6B7280" />
              <Text style={styles.settingText}>Modo escuro</Text>
            </View>
            <Switch
              onValueChange={setIsDarkModeEnabled}
              value={isDarkModeEnabled}
              trackColor={{ false: '#D1D5DB', true: '#6B7280' }}
              thumbColor={isDarkModeEnabled ? '#ffffff' : '#ffffff'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="globe" size={20} color="#6B7280" />
              <Text style={styles.settingText}>Linguagem</Text>
            </View>
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>{selectedLanguage}</Text>
              <Feather name="chevron-down" size={16} color="#6B7280" />
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="cellphone" size={20} color="#6B7280" />
              <Text style={styles.settingText}>Versão do aplicativo</Text>
            </View>
            <Text style={styles.settingValue}>v3.2.0 (2025)</Text>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightContainer}>
          <Text style={styles.copyright}>MotoSync © 2025</Text>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userBranch: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  branchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  branchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  branchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  branchInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  layoutButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  layoutButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  layoutDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 8,
  },
  copyrightContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  copyright: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default SettingsScreen; 