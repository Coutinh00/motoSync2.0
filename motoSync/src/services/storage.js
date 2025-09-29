import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves para armazenamento
const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  MOTOS: 'motos',
  USERS: 'users',
  BRANCHES: 'branches',
  SETTINGS: 'settings',
};

// Funções genéricas para AsyncStorage
export const storageService = {
  // Salvar dados
  setItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  },

  // Buscar dados
  getItem: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      return null;
    }
  },

  // Remover dados
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover dados:', error);
      return false;
    }
  },

  // Limpar todos os dados
  clear: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      return false;
    }
  },
};

// Serviços específicos para cada entidade
export const userStorage = {
  // Salvar dados do usuário logado
  saveUserData: async (userData) => {
    return await storageService.setItem(STORAGE_KEYS.USER_DATA, userData);
  },

  // Buscar dados do usuário logado
  getUserData: async () => {
    return await storageService.getItem(STORAGE_KEYS.USER_DATA);
  },

  // Salvar token de autenticação
  saveToken: async (token) => {
    return await storageService.setItem(STORAGE_KEYS.USER_TOKEN, token);
  },

  // Buscar token de autenticação
  getToken: async () => {
    return await storageService.getItem(STORAGE_KEYS.USER_TOKEN);
  },

  // Fazer logout (remover dados do usuário)
  logout: async () => {
    await storageService.removeItem(STORAGE_KEYS.USER_DATA);
    await storageService.removeItem(STORAGE_KEYS.USER_TOKEN);
    return true;
  },
};

export const motoStorage = {
  // Salvar lista de motos
  saveMotos: async (motos) => {
    return await storageService.setItem(STORAGE_KEYS.MOTOS, motos);
  },

  // Buscar lista de motos
  getMotos: async () => {
    return await storageService.getItem(STORAGE_KEYS.MOTOS) || [];
  },

  // Adicionar nova moto
  addMoto: async (moto) => {
    try {
      const motos = await motoStorage.getMotos();
      const newMotos = [...motos, moto];
      return await motoStorage.saveMotos(newMotos);
    } catch (error) {
      console.error('Erro ao adicionar moto:', error);
      return false;
    }
  },

  // Atualizar moto existente
  updateMoto: async (id, updatedMoto) => {
    try {
      const motos = await motoStorage.getMotos();
      const updatedMotos = motos.map(moto => 
        moto.id === id ? { ...moto, ...updatedMoto } : moto
      );
      return await motoStorage.saveMotos(updatedMotos);
    } catch (error) {
      console.error('Erro ao atualizar moto:', error);
      return false;
    }
  },

  // Remover moto
  removeMoto: async (id) => {
    try {
      const motos = await motoStorage.getMotos();
      const filteredMotos = motos.filter(moto => moto.id !== id);
      return await motoStorage.saveMotos(filteredMotos);
    } catch (error) {
      console.error('Erro ao remover moto:', error);
      return false;
    }
  },
};

export const userListStorage = {
  // Salvar lista de usuários
  saveUsers: async (users) => {
    return await storageService.setItem(STORAGE_KEYS.USERS, users);
  },

  // Buscar lista de usuários
  getUsers: async () => {
    return await storageService.getItem(STORAGE_KEYS.USERS) || [];
  },

  // Adicionar novo usuário
  addUser: async (user) => {
    try {
      const users = await userListStorage.getUsers();
      const newUsers = [...users, user];
      return await userListStorage.saveUsers(newUsers);
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false;
    }
  },

  // Atualizar usuário existente
  updateUser: async (id, updatedUser) => {
    try {
      const users = await userListStorage.getUsers();
      const updatedUsers = users.map(user => 
        user.id === id ? { ...user, ...updatedUser } : user
      );
      return await userListStorage.saveUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  },

  // Remover usuário
  removeUser: async (id) => {
    try {
      const users = await userListStorage.getUsers();
      const filteredUsers = users.filter(user => user.id !== id);
      return await userListStorage.saveUsers(filteredUsers);
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      return false;
    }
  },
};

export const branchStorage = {
  // Salvar lista de filiais
  saveBranches: async (branches) => {
    return await storageService.setItem(STORAGE_KEYS.BRANCHES, branches);
  },

  // Buscar lista de filiais
  getBranches: async () => {
    return await storageService.getItem(STORAGE_KEYS.BRANCHES) || [];
  },

  // Adicionar nova filial
  addBranch: async (branch) => {
    try {
      const branches = await branchStorage.getBranches();
      const newBranches = [...branches, branch];
      return await branchStorage.saveBranches(newBranches);
    } catch (error) {
      console.error('Erro ao adicionar filial:', error);
      return false;
    }
  },
};

export const settingsStorage = {
  // Salvar configurações
  saveSettings: async (settings) => {
    return await storageService.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  // Buscar configurações
  getSettings: async () => {
    return await storageService.getItem(STORAGE_KEYS.SETTINGS) || {};
  },
};

export default storageService;
