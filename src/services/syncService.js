/**
 * Serviço de Sincronização
 * Gerencia a sincronização entre API e AsyncStorage para todas as entidades
 */

import { userService, motoService, branchService } from './api';
import { userListStorage, motoStorage, branchStorage } from './storage';

/**
 * Sincroniza usuários da API com o AsyncStorage
 * @returns {Promise<Array>} Lista de usuários sincronizados
 */
export const syncUsers = async () => {
  try {
    console.log('🔄 Iniciando sincronização de usuários...');
    
    // Buscar usuários da API
    const apiUsers = await userService.getAll();
    console.log(`📡 ${apiUsers.length} usuários encontrados na API`);
    
    // Mapear dados da API para o formato interno
    const mappedUsers = apiUsers.map(apiUser => ({
      id: apiUser.id,
      name: apiUser.login,
      email: apiUser.login,
      cpf: '',
      phone: '',
      filial: 'Butantã-1',
      role: 'Usuário',
      status: 'Ativo',
      createdAt: apiUser.createdAt,
      login: apiUser.login,
    }));
    
    // Salvar no AsyncStorage
    await userListStorage.saveUsers(mappedUsers);
    console.log('💾 Usuários salvos no AsyncStorage');
    
    return mappedUsers;
  } catch (error) {
    console.error('❌ Erro na sincronização:', error.message);
    
    // Em caso de erro, tentar usar dados locais
    const localUsers = await userListStorage.getUsers();
    console.log(`📱 Usando ${localUsers.length} usuários locais`);
    
    return localUsers;
  }
};

/**
 * Sincroniza motos da API com o AsyncStorage
 * @returns {Promise<Array>} Lista de motos sincronizadas
 */
export const syncMotos = async () => {
  try {
    console.log('🔄 Iniciando sincronização de motos...');
    
    // Buscar motos da API
    const apiMotos = await motoService.getAll();
    console.log(`📡 ${apiMotos.length} motos encontradas na API`);
    
    // Salvar no AsyncStorage
    await motoStorage.saveMotos(apiMotos);
    console.log('💾 Motos salvas no AsyncStorage');
    
    return apiMotos;
  } catch (error) {
    console.error('❌ Erro na sincronização de motos:', error.message);
    
    // Em caso de erro, tentar usar dados locais
    const localMotos = await motoStorage.getMotos();
    console.log(`📱 Usando ${localMotos.length} motos locais`);
    
    return localMotos;
  }
};

/**
 * Sincroniza filiais da API com o AsyncStorage
 * @returns {Promise<Array>} Lista de filiais sincronizadas
 */
export const syncBranches = async () => {
  try {
    console.log('🔄 Iniciando sincronização de filiais...');
    
    // Buscar filiais da API
    const apiBranches = await branchService.getAll();
    console.log(`📡 ${apiBranches.length} filiais encontradas na API`);
    
    // Salvar no AsyncStorage
    await branchStorage.saveBranches(apiBranches);
    console.log('💾 Filiais salvas no AsyncStorage');
    
    return apiBranches;
  } catch (error) {
    console.error('❌ Erro na sincronização de filiais:', error.message);
    
    // Em caso de erro, tentar usar dados locais
    const localBranches = await branchStorage.getBranches();
    console.log(`📱 Usando ${localBranches.length} filiais locais`);
    
    return localBranches;
  }
};

/**
 * Sincroniza um usuário específico
 * @param {string} userId - ID do usuário
 * @returns {Promise<Object>} Dados do usuário sincronizado
 */
export const syncUser = async (userId) => {
  try {
    console.log(`🔄 Sincronizando usuário ${userId}...`);
    
    // Buscar usuário da API
    const apiUser = await userService.getById(userId);
    
    // Mapear dados da API para o formato interno
    const mappedUser = {
      id: apiUser.id,
      name: apiUser.login,
      email: apiUser.login,
      cpf: '',
      phone: '',
      filial: 'Butantã-1',
      role: 'Usuário',
      status: 'Ativo',
      createdAt: apiUser.createdAt,
      login: apiUser.login,
    };
    
    // Atualizar no AsyncStorage
    await userListStorage.updateUser(userId, mappedUser);
    console.log('💾 Usuário atualizado no AsyncStorage');
    
    return mappedUser;
  } catch (error) {
    console.error('❌ Erro na sincronização do usuário:', error.message);
    throw error;
  }
};

/**
 * Sincroniza uma moto específica
 * @param {string} motoId - ID da moto
 * @returns {Promise<Object>} Dados da moto sincronizada
 */
export const syncMoto = async (motoId) => {
  try {
    console.log(`🔄 Sincronizando moto ${motoId}...`);
    
    // Buscar moto da API
    const apiMoto = await motoService.getById(motoId);
    
    // Atualizar no AsyncStorage
    await motoStorage.updateMoto(motoId, apiMoto);
    console.log('💾 Moto atualizada no AsyncStorage');
    
    return apiMoto;
  } catch (error) {
    console.error('❌ Erro na sincronização da moto:', error.message);
    throw error;
  }
};

/**
 * Força sincronização completa de todas as entidades
 * @returns {Promise<Object>} Resultado da sincronização
 */
export const forceSync = async () => {
  try {
    console.log('🔄 Forçando sincronização completa...');
    
    const [users, motos, branches] = await Promise.all([
      syncUsers(),
      syncMotos(),
      syncBranches()
    ]);
    
    return {
      success: true,
      usersCount: users.length,
      motosCount: motos.length,
      branchesCount: branches.length,
      message: 'Sincronização completa realizada com sucesso',
    };
  } catch (error) {
    console.error('❌ Erro na sincronização forçada:', error.message);
    
    return {
      success: false,
      error: error.message,
      message: 'Erro na sincronização',
    };
  }
};

/**
 * Verifica se há dados para sincronizar
 * @returns {Promise<Object>} Status da sincronização
 */
export const checkSyncStatus = async () => {
  try {
    // Buscar dados da API
    const [apiUsers, apiMotos, apiBranches] = await Promise.all([
      userService.getAll(),
      motoService.getAll(),
      branchService.getAll()
    ]);
    
    // Buscar dados locais
    const [localUsers, localMotos, localBranches] = await Promise.all([
      userListStorage.getUsers(),
      motoStorage.getMotos(),
      branchStorage.getBranches()
    ]);
    
    return {
      users: {
        apiCount: apiUsers.length,
        localCount: localUsers.length,
        needsSync: apiUsers.length !== localUsers.length,
      },
      motos: {
        apiCount: apiMotos.length,
        localCount: localMotos.length,
        needsSync: apiMotos.length !== localMotos.length,
      },
      branches: {
        apiCount: apiBranches.length,
        localCount: localBranches.length,
        needsSync: apiBranches.length !== localBranches.length,
      },
      lastSync: new Date().toISOString(),
    };
  } catch (error) {
    return {
      users: { apiCount: 0, localCount: 0, needsSync: true },
      motos: { apiCount: 0, localCount: 0, needsSync: true },
      branches: { apiCount: 0, localCount: 0, needsSync: true },
      error: error.message,
    };
  }
};

/**
 * Sincronização inteligente - só sincroniza se necessário
 * @returns {Promise<Object>} Resultado da sincronização
 */
export const smartSync = async () => {
  try {
    const syncStatus = await checkSyncStatus();
    
    const syncPromises = [];
    
    if (syncStatus.users.needsSync) {
      syncPromises.push(syncUsers());
    }
    
    if (syncStatus.motos.needsSync) {
      syncPromises.push(syncMotos());
    }
    
    if (syncStatus.branches.needsSync) {
      syncPromises.push(syncBranches());
    }
    
    if (syncPromises.length === 0) {
      return {
        success: true,
        message: 'Todos os dados já estão sincronizados',
        synced: false,
      };
    }
    
    await Promise.all(syncPromises);
    
    return {
      success: true,
      message: 'Sincronização inteligente realizada com sucesso',
      synced: true,
    };
  } catch (error) {
    console.error('❌ Erro na sincronização inteligente:', error.message);
    
    return {
      success: false,
      error: error.message,
      message: 'Erro na sincronização inteligente',
    };
  }
};

export default {
  syncUsers,
  syncMotos,
  syncBranches,
  syncUser,
  syncMoto,
  forceSync,
  checkSyncStatus,
  smartSync,
};
