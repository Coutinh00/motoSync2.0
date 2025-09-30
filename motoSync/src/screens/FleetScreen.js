import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { motoService } from '../services/api';
import { motoStorage } from '../services/storage';
import { useTheme } from '../contexts/ThemeContext';
import { ModernCard, AnimatedCard, GradientBackground } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';
import useResponsive from '../hooks/useResponsive';

const motosData = [
  { id: '1', plate: 'ABC-1234', model: 'Mottu POP', chassis: '2KDJ3LPD9', rfid: '1938402011', status: 'Prontas', location: 'Brasil, São Paulo', filial: 'Butantã-1' },
  { id: '2', plate: 'XYZ5678', model: 'Mottu Sport 110i', chassis: '2KDJ3LPD9', rfid: '291003284013', status: 'Dano Leve', location: 'Brasil, São Paulo', filial: 'Butantã-1' },
  { id: '3', plate: 'LMN4321', model: 'Mottu-e', chassis: 'WB30G3105KRA49219', rfid: '843920130002', status: 'Dano Grave', location: 'Brasil, São Paulo', filial: 'Osasco-3' },
  { id: '4', plate: 'DEF5679', model: 'Mottu-e', chassis: '9C2JA4120CR456789', rfid: '120398120038', status: 'Dano Leve', location: 'México, Cidade do México', filial: 'Butantã-1' },
  { id: '5', plate: 'JDAS91', model: 'Mottu-e', chassis: 'MLHNC5140F5302324', rfid: '238472983411', status: 'Dano Leve', location: 'México, Cidade do México', filial: 'Butantã-1' },
];

const FleetScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const theme = useTheme();
  const { responsiveSize, responsiveFontSize, getCardWidth, getPadding, isSmall, isTablet } = useResponsive();

  // Carregar motos ao montar o componente
  useEffect(() => {
    loadMotos();
  }, []);

  // Recarregar motos quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      loadMotos();
    }, [])
  );

  const loadMotos = async () => {
    setLoading(true);
    try {
      // Tentar carregar da API primeiro
      const apiMotos = await motoService.getAll();
      setMotos(apiMotos);
      // Salvar no AsyncStorage para uso offline
      await motoStorage.saveMotos(apiMotos);
    } catch (error) {
      console.log('Erro ao carregar da API, usando dados locais:', error.message);
      // Se a API falhar, usar dados do AsyncStorage
      const localMotos = await motoStorage.getMotos();
      if (localMotos.length > 0) {
        setMotos(localMotos);
      } else {
        // Se não houver dados locais, usar dados mock
        setMotos(motosData);
        await motoStorage.saveMotos(motosData);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMotos();
    setRefreshing(false);
  };

  const handleDeleteMoto = async (motoId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta moto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await motoService.delete(motoId);
              await motoStorage.removeMoto(motoId);
              setMotos(prev => prev.filter(moto => moto.id !== motoId));
              Alert.alert('Sucesso', 'Moto excluída com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao excluir moto: ' + error.message);
            }
          }
        }
      ]
    );
  };

  const renderMotoItem = ({ item }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Prontas':
          return theme.colors.success;
        case 'Dano Leve':
          return theme.colors.warning;
        case 'Dano Grave':
          return theme.colors.danger;
        default:
          return theme.colors.gray[500];
      }
    };

    const getStatusGradient = (status) => {
      switch (status) {
        case 'Prontas':
          return theme.colors.successGradient;
        case 'Dano Leve':
          return theme.colors.warningGradient;
        case 'Dano Grave':
          return theme.colors.dangerGradient;
        default:
          return theme.colors.gray[500];
      }
    };

    return (
      <AnimatedCard style={styles.motoCard} pressable={true} onPress={() => navigation.navigate('MotoDetails', { moto: item })} delay={parseInt(item.id) * 100}>
        <View style={styles.motoHeader}>
          <View style={styles.motoTitleContainer}>
            <Text style={styles.motoPlate}>{item.plate}</Text>
            <Text style={styles.motoModel}>{item.model}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.motoDetails}>
          <View style={styles.motoDetailRow}>
            <Feather name="hash" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.motoDetailText}>Chassis: {item.chassis}</Text>
          </View>
          <View style={styles.motoDetailRow}>
            <Feather name="tag" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.motoDetailText}>RFID: {item.rfid}</Text>
          </View>
          <View style={styles.motoDetailRow}>
            <Feather name="map-pin" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.motoDetailText}>{item.location}</Text>
          </View>
          <View style={styles.motoDetailRow}>
            <Feather name="building" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.motoDetailText}>{item.filial}</Text>
          </View>
        </View>

        <View style={styles.motoActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.viewButton]} 
            onPress={() => navigation.navigate('MotoDetails', { moto: item })}
          >
            <Feather name="eye" size={16} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Ver</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]} 
            onPress={() => navigation.navigate('EditMoto', { moto: item })}
          >
            <Feather name="edit" size={16} color={theme.colors.warning} />
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={() => handleDeleteMoto(item.id)}
          >
            <Feather name="trash-2" size={16} color={theme.colors.danger} />
            <Text style={styles.actionButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </AnimatedCard>
    );
  };

  return (
    <View style={styles.container}>
      {/* Renderização condicional baseada na rota */}
      {route.name === 'Home' ? (
        // Conteúdo para a tela Home com design moderno
        <GradientBackground colors={theme.colors.background.gradient} style={styles.homeContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Moderno */}
            <View style={styles.modernHeader}>
              <View style={styles.headerLeft}>
                <View style={styles.profileIcon}>
                  <MaterialCommunityIcons name="account" size={24} color={theme.colors.white} />
                </View>
                <View>
                  <Text style={styles.greetingText}>Olá, John!</Text>
                  <Text style={styles.greetingSubtext}>Bem-vindo de volta</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Feather name="bell" size={24} color={theme.colors.primary} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>

            {/* Cards de Estatísticas Modernos com Animações */}
            <View style={[styles.statsGrid, { paddingHorizontal: getPadding() }]}>
              <AnimatedCard variant="stat" gradient={true} gradientColors={theme.colors.primaryGradient} style={[styles.statCard, { width: getCardWidth() }]} delay={0}>
                <MaterialCommunityIcons name="motorbike" size={responsiveSize(32)} color={theme.colors.white} />
                <Text style={[styles.statNumber, { fontSize: responsiveFontSize(28) }]}>245</Text>
                <Text style={[styles.statLabel, { fontSize: responsiveFontSize(12) }]}>Total de Motos</Text>
              </AnimatedCard>

              <AnimatedCard variant="stat" gradient={true} gradientColors={theme.colors.successGradient} style={[styles.statCard, { width: getCardWidth() }]} delay={100}>
                <Feather name="check-circle" size={responsiveSize(32)} color={theme.colors.white} />
                <Text style={[styles.statNumber, { fontSize: responsiveFontSize(28) }]}>45</Text>
                <Text style={[styles.statLabel, { fontSize: responsiveFontSize(12) }]}>Prontas</Text>
              </AnimatedCard>

              <AnimatedCard variant="stat" gradient={true} gradientColors={theme.colors.warningGradient} style={[styles.statCard, { width: getCardWidth() }]} delay={200}>
                <Feather name="tool" size={responsiveSize(32)} color={theme.colors.white} />
                <Text style={[styles.statNumber, { fontSize: responsiveFontSize(28) }]}>12</Text>
                <Text style={[styles.statLabel, { fontSize: responsiveFontSize(12) }]}>Manutenção</Text>
              </AnimatedCard>

              <AnimatedCard variant="stat" gradient={true} gradientColors={theme.colors.dangerGradient} style={[styles.statCard, { width: getCardWidth() }]} delay={300}>
                <Feather name="alert-triangle" size={responsiveSize(32)} color={theme.colors.white} />
                <Text style={[styles.statNumber, { fontSize: responsiveFontSize(28) }]}>8</Text>
                <Text style={[styles.statLabel, { fontSize: responsiveFontSize(12) }]}>Com Problemas</Text>
              </AnimatedCard>
            </View>

            {/* Seção de Ações Rápidas */}
            <AnimatedCard style={styles.quickActionsCard} delay={400}>
              <Text style={styles.sectionTitle}>Ações Rápidas</Text>
              <View style={styles.quickActionsGrid}>
                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.primary }]}>
                    <Feather name="plus" size={20} color={theme.colors.white} />
                  </View>
                  <Text style={styles.quickActionText}>Adicionar Moto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.success }]}>
                    <Feather name="search" size={20} color={theme.colors.white} />
                  </View>
                  <Text style={styles.quickActionText}>Buscar Moto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.warning }]}>
                    <Feather name="settings" size={20} color={theme.colors.white} />
                  </View>
                  <Text style={styles.quickActionText}>Configurações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.info }]}>
                    <Feather name="bar-chart" size={20} color={theme.colors.white} />
                  </View>
                  <Text style={styles.quickActionText}>Relatórios</Text>
                </TouchableOpacity>
              </View>
            </AnimatedCard>

            {/* Seção de Layout */}
            <AnimatedCard style={styles.layoutCard} delay={500}>
              <Text style={styles.sectionTitle}>Layout da Filial</Text>
              <View style={styles.layoutPreview}>
                <MaterialCommunityIcons name="map" size={48} color={theme.colors.primary} />
                <Text style={styles.layoutText}>Visualização do Layout</Text>
                <Text style={styles.layoutSubtext}>Toque para ver o layout completo</Text>
              </View>
            </AnimatedCard>
          </ScrollView>
        </GradientBackground>
      ) : (
        // Conteúdo para a tela Motos (Lista de Motos)
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <Feather name="arrow-left" size={24} color="black" /> {/* Talvez remover este botão de voltar na tela de lista principal */}
            <Text style={styles.headerTitle}>Lista de Motos</Text>
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
            data={motos}
            renderItem={renderMotoItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhuma moto encontrada</Text>
              </View>
            }
          />

          {/* Add Moto Button Moderno */}
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddMoto')}>
            <LinearGradient
              colors={theme.colors.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addButtonGradient}
            >
              <AntDesign name="plus" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      <LoadingSpinner visible={loading} message="Carregando motos..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  homeContainer: {
    flex: 1,
  },
  modernHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  greetingSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    padding: 20,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  quickActionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  layoutCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
  layoutPreview: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  layoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 12,
    marginBottom: 4,
  },
  layoutSubtext: {
    fontSize: 14,
    color: '#64748b',
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
  motoCard: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
  },
  motoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  motoTitleContainer: {
    flex: 1,
  },
  motoPlate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  motoModel: {
    fontSize: 16,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  motoDetails: {
    marginBottom: 16,
  },
  motoDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  motoDetailText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
    flex: 1,
  },
  motoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  editButton: {
    backgroundColor: 'rgba(250, 217, 97, 0.1)',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  addButtonGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '48%', // Ajustar conforme necessário
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  layoutSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  layoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  layoutImagePlaceholder: {
    backgroundColor: '#e0e0e0',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  motoActions: {
    alignItems: 'flex-end',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  editButton: {
    padding: 5,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
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
});

export default FleetScreen; 