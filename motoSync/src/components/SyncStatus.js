/**
 * Componente SyncStatus
 * Mostra o status de sincronização com a API
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { checkSyncStatus, forceSync } from '../services/syncService';

/**
 * Componente SyncStatus
 * @param {Object} props - Props do componente
 * @param {Function} props.onSync - Callback chamado após sincronização
 * @param {Object} props.style - Estilos adicionais
 * @returns {React.ReactNode} Componente SyncStatus
 */
const SyncStatus = ({ onSync, style }) => {
  const theme = useTheme();
  const [syncStatus, setSyncStatus] = useState({
    apiCount: 0,
    localCount: 0,
    needsSync: false,
    lastSync: null,
    loading: false,
  });

  // Verificar status de sincronização
  const checkStatus = async () => {
    try {
      const status = await checkSyncStatus();
      setSyncStatus(prev => ({
        ...prev,
        ...status,
        loading: false,
      }));
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      setSyncStatus(prev => ({
        ...prev,
        loading: false,
      }));
    }
  };

  // Forçar sincronização
  const handleForceSync = async () => {
    setSyncStatus(prev => ({ ...prev, loading: true }));
    
    try {
      const result = await forceSync();
      
      if (result.success) {
        // Atualizar status após sincronização
        await checkStatus();
        
        // Chamar callback se fornecido
        if (onSync) {
          onSync(result);
        }
      }
    } catch (error) {
      console.error('Erro na sincronização:', error);
    } finally {
      setSyncStatus(prev => ({ ...prev, loading: false }));
    }
  };

  // Verificar status ao montar o componente
  useEffect(() => {
    checkStatus();
  }, []);

  // Determinar cor e ícone baseado no status
  const getStatusColor = () => {
    if (syncStatus.loading) return theme.colors.info;
    if (syncStatus.needsSync) return theme.colors.warning;
    return theme.colors.success;
  };

  const getStatusIcon = () => {
    if (syncStatus.loading) return 'loader';
    if (syncStatus.needsSync) return 'refresh-cw';
    return 'check-circle';
  };

  const getStatusText = () => {
    if (syncStatus.loading) return 'Sincronizando...';
    if (syncStatus.needsSync) return 'Sincronização necessária';
    return 'Sincronizado';
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.statusContainer}>
        <Feather 
          name={getStatusIcon()} 
          size={16} 
          color={getStatusColor()}
          style={[
            styles.icon,
            syncStatus.loading && styles.rotating
          ]} 
        />
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[theme.text.caption, styles.infoText]}>
          API: {syncStatus.apiCount} | Local: {syncStatus.localCount}
        </Text>
      </View>
      
      {syncStatus.needsSync && (
        <TouchableOpacity 
          style={[styles.syncButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleForceSync}
          disabled={syncStatus.loading}
        >
          <Feather name="refresh-cw" size={14} color={theme.colors.white} />
          <Text style={[styles.syncButtonText, { color: theme.colors.white }]}>
            Sincronizar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    marginVertical: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 6,
  },
  rotating: {
    // Animação será aplicada via transform
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoContainer: {
    marginLeft: 8,
  },
  infoText: {
    fontSize: 10,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  syncButtonText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default SyncStatus;
