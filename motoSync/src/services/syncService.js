/**
 * Serviço de Sincronização
 * Gerencia a sincronização entre API e AsyncStorage
 */

import { userService } from './api';
import { userListStorage } from './storage';

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
 * Força sincronização completa
 * @returns {Promise<Object>} Resultado da sincronização
 */
export const forceSync = async () => {
  try {
    console.log('🔄 Forçando sincronização completa...');
    
    const users = await syncUsers();
    
    return {
      success: true,
      usersCount: users.length,
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
    const apiUsers = await userService.getAll();
    
    // Buscar dados locais
    const localUsers = await userListStorage.getUsers();
    
    return {
      apiCount: apiUsers.length,
      localCount: localUsers.length,
      needsSync: apiUsers.length !== localUsers.length,
      lastSync: new Date().toISOString(),
    };
  } catch (error) {
    return {
      apiCount: 0,
      localCount: 0,
      needsSync: true,
      error: error.message,
    };
  }
};

export default {
  syncUsers,
  syncUser,
  forceSync,
  checkSyncStatus,
};
