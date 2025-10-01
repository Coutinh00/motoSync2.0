import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { motoService } from '../services/api';
import { motoStorage } from '../services/storage';
import { syncMotos } from '../services/syncService';
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
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const route = useRoute();
  const theme = useTheme();
  const { responsiveSize, responsiveFontSize, getCardWidth, getPadding, isSmall, isTablet } = useResponsive();

  // Carregar motos ao montar o componente
  useEffect(() => {
    loadMotos();
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

  // Recarregar motos quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      loadMotos();
    }, [])
  );

  const loadMotos = async () => {
    setLoading(true);
    try {
      // Usar serviço de sincronização
      const syncedMotos = await syncMotos();
      setMotos(syncedMotos);
    } catch (error) {
      console.log('Erro na sincronização, usando dados locais:', error.message);
      // Se a sincronização falhar, usar dados do AsyncStorage
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
          return '#10B981'; // Verde claro
        case 'Dano Leve':
          return '#F59E0B'; // Amarelo
        case 'Dano Grave':
          return '#EF4444'; // Vermelho
        default:
          return '#6B7280';
      }
    };

    return (
      <View style={styles.motoCardNew}>
        <View style={styles.motoHeaderNew}>
          <View style={styles.motoTitleContainerNew}>
            <Text style={styles.motoModelNew}>{item.model}</Text>
            <Text style={styles.motoPlateNew}>Plate: {item.plate}</Text>
            <Text style={styles.motoChassisNew}>Chassis: {item.chassis}</Text>
            <Text style={styles.motoRfidNew}>RFID: {item.rfid}</Text>
          </View>
          <View style={[styles.statusBadgeNew, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusTextNew}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.motoLocationNew}>
          <Feather name="map-pin" size={16} color="#6B7280" />
          <Text style={styles.locationTextNew}>{item.location}</Text>
        </View>

        <View style={styles.motoBranchNew}>
          <Text style={styles.branchTextNew}>Filial: {item.filial}</Text>
        </View>

        <View style={styles.motoActionNew}>
          <TouchableOpacity 
            style={styles.viewButtonNew} 
            onPress={() => navigation.navigate('MotoDetails', { moto: item })}
          >
            <Text style={styles.viewButtonTextNew}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Renderização condicional baseada na rota */}
      {route.name === 'Home' ? (
        // Conteúdo para a tela Home com design da imagem
        <View style={styles.homeContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          
          {/* Header Superior */}
          <View style={styles.topHeader}>
            <Text style={styles.topHeaderText}>Home</Text>
          </View>
          
          {/* Header Principal */}
          <View style={styles.mainHeader}>
            <TouchableOpacity style={styles.bellButton}>
              <Feather name="bell" size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Inicio</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Feather name="menu" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Mensagem de Boas-vindas */}
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Welcome back, John</Text>
            </View>

            {/* Cards de Estatísticas */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="motorbike" size={32} color="#000000" />
                <Text style={styles.statNumber}>245</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>

              <View style={styles.statCard}>
                <Feather name="tool" size={32} color="#000000" />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Manutenção</Text>
              </View>

              <View style={styles.statCard}>
                <Feather name="tag" size={32} color="#000000" />
                <Text style={styles.statNumber}>45</Text>
                <Text style={styles.statLabel}>Prontas</Text>
              </View>

              <View style={styles.statCard}>
                <MaterialCommunityIcons name="truck" size={32} color="#000000" />
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Estacionada</Text>
              </View>
            </View>

            {/* Seção de Layout */}
            <View style={styles.layoutSection}>
              <Text style={styles.layoutTitle}>Layout</Text>
              <View style={styles.layoutContainer}>
                <View style={styles.layoutDiagram}>
                  {/* Layout da Filial */}
                  <View style={styles.layoutGrid}>
                    {/* Espaço Cliente */}
                    <View style={[styles.layoutArea, styles.clientSpace]}>
                      <Text style={styles.areaLabel}>ESPAÇO CLIENTE</Text>
                      <MaterialCommunityIcons name="account" size={20} color="#000000" />
                    </View>
                    
                    {/* Box Rápido */}
                    <View style={[styles.layoutArea, styles.quickBox]}>
                      <Text style={styles.areaLabel}>BOX RÁPIDO</Text>
                      <Feather name="clock" size={20} color="#000000" />
                    </View>
                    
                    {/* Pátio */}
                    <View style={[styles.layoutArea, styles.patio]}>
                      <Text style={styles.areaLabel}>PÁTIO</Text>
                      <View style={styles.motoIcons}>
                        <View style={[styles.motoIcon, { backgroundColor: '#FCD34D' }]} />
                        <View style={[styles.motoIcon, { backgroundColor: '#9CA3AF' }]} />
                        <View style={[styles.motoIcon, { backgroundColor: '#EF4444' }]} />
                      </View>
                    </View>
                    
                    {/* Rampas de Manutenção */}
                    <View style={[styles.layoutArea, styles.maintenance]}>
                      <Text style={styles.areaLabel}>RAMPAS DE MANUTENÇÃO</Text>
                      <View style={styles.maintenanceIcons}>
                        <Text style={styles.xIcon}>✕</Text>
                        <Text style={styles.xIcon}>✕</Text>
                        <Text style={styles.xIcon}>✕</Text>
                      </View>
                    </View>
                    
                    {/* Qualidade */}
                    <View style={[styles.layoutArea, styles.quality]}>
                      <Text style={styles.areaLabel}>QUALIDADE</Text>
                      <Feather name="check-square" size={20} color="#000000" />
                    </View>
                    
                    {/* Recuperação de Peças */}
                    <View style={[styles.layoutArea, styles.parts]}>
                      <Text style={styles.areaLabel}>RECUPERAÇÃO DE PEÇAS</Text>
                      <View style={styles.partsIcons}>
                        <Text style={styles.xIcon}>✕</Text>
                        <Text style={styles.xIcon}>✕</Text>
                        <Text style={styles.xIcon}>✕</Text>
                      </View>
                    </View>
                    
                    {/* IOT */}
                    <View style={[styles.layoutArea, styles.iot]}>
                      <Text style={styles.areaLabel}>IOT</Text>
                      <Feather name="wifi" size={20} color="#000000" />
                    </View>
                    
                    {/* Estoque */}
                    <View style={[styles.layoutArea, styles.stock]}>
                      <Text style={styles.areaLabel}>ESTOQUE</Text>
                      <Feather name="package" size={20} color="#000000" />
                    </View>
                    
                    {/* Escritório */}
                    <View style={[styles.layoutArea, styles.office]}>
                      <Text style={styles.areaLabel}>ESCRITÓRIO</Text>
                      <Feather name="monitor" size={20} color="#000000" />
                    </View>
                  </View>
                  
                  {/* Legenda */}
                  <View style={styles.legend}>
                    <Text style={styles.legendTitle}>LEGENDA - PENDÊNCIA</Text>
                    <View style={styles.legendItems}>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#FCD34D' }]} />
                        <Text style={styles.legendText}>PENDÊNCIA</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
                        <Text style={styles.legendText}>REPAROS SIMPLES</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#F97316' }]} />
                        <Text style={styles.legendText}>DANOS ESTRUTURAIS GRAVES</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
                        <Text style={styles.legendText}>MOTOR DEFEITUOSO</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#9CA3AF' }]} />
                        <Text style={styles.legendText}>AGENDADA PARA MANUTENÇÃO</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
                        <Text style={styles.legendText}>PRONTA PARA ALUGUEL</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#EC4899' }]} />
                        <Text style={styles.legendText}>SEM PLACA</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#84CC16' }]} />
                        <Text style={styles.legendText}>MINHA MOTTU</Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.expandButton}>
                  <Feather name="maximize-2" size={20} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        // Conteúdo para a tela Motos (Lista de Motos)
        <View style={{ flex: 1 }}>
          {/* Header Superior */}
          <View style={styles.topHeaderMotos}>
            <Text style={styles.topHeaderTextMotos}>Listar motos</Text>
          </View>

          {/* Header Principal */}
          <View style={styles.mainHeaderMotos}>
            <TouchableOpacity style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitleMotos}>Motorcycles</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Search and Filter */}
          <View style={styles.searchFilterContainerMotos}>
            <View style={styles.searchInputContainerMotos}>
              <Feather name="search" size={20} color="#6B7280" />
              <TextInput
                style={styles.searchInputMotos}
                placeholder="Search by model, plate, or status"
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity style={styles.filterButtonMotos}>
                <Feather name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Moto List */}
          <FlatList
            data={motos}
            renderItem={renderMotoItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContentNew}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhuma moto encontrada</Text>
              </View>
            }
          />

          {/* Add Moto Button */}
          <TouchableOpacity 
            style={styles.addButtonNew} 
            onPress={() => {
              setShowSuccessToast(true);
              navigation.navigate('AddMoto');
            }}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>

          {/* Success Toast */}
          {showSuccessToast && (
            <View style={styles.successToast}>
              <Feather name="check" size={20} color="#ffffff" />
              <Text style={styles.successToastText}>Moto cadastrada com sucesso!</Text>
            </View>
          )}
        </View>
      )}

      <LoadingSpinner visible={loading} message="Carregando motos..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  bellButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  menuButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  layoutSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  layoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  layoutContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  layoutImage: {
    width: '100%',
    height: 300,
  },
  expandButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutDiagram: {
    flex: 1,
  },
  layoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  layoutArea: {
    width: '30%',
    height: 80,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  clientSpace: {
    backgroundColor: '#F3F4F6',
  },
  quickBox: {
    backgroundColor: '#F3F4F6',
  },
  patio: {
    backgroundColor: '#F3F4F6',
  },
  maintenance: {
    backgroundColor: '#F3F4F6',
  },
  quality: {
    backgroundColor: '#F3F4F6',
  },
  parts: {
    backgroundColor: '#F3F4F6',
  },
  iot: {
    backgroundColor: '#F3F4F6',
  },
  stock: {
    backgroundColor: '#F3F4F6',
  },
  office: {
    backgroundColor: '#F3F4F6',
  },
  motoIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  motoIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  maintenanceIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  partsIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xIcon: {
    fontSize: 12,
    color: '#000000',
    marginHorizontal: 2,
  },
  legend: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 8,
    color: '#000000',
    flex: 1,
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
  listContentNew: {
    paddingBottom: 100,
    backgroundColor: '#ffffff',
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
  // Novos estilos para o design da imagem
  topHeaderMotos: {
    backgroundColor: '#6B7280',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  topHeaderTextMotos: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  mainHeaderMotos: {
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
  headerTitleMotos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchFilterContainerMotos: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  searchInputContainerMotos: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInputMotos: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  filterButtonMotos: {
    padding: 4,
  },
  motoCardNew: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  motoHeaderNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  motoTitleContainerNew: {
    flex: 1,
  },
  motoModelNew: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  motoPlateNew: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  motoChassisNew: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  motoRfidNew: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadgeNew: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  statusTextNew: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  motoLocationNew: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTextNew: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  motoBranchNew: {
    marginBottom: 12,
  },
  branchTextNew: {
    fontSize: 14,
    color: '#6B7280',
  },
  motoActionNew: {
    alignItems: 'flex-end',
  },
  viewButtonNew: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewButtonTextNew: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  addButtonNew: {
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
});

export default FleetScreen; 