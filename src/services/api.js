import axios from 'axios';

const BASE_URL = 'https://68d9a88d90a75154f0dae049.mockapi.io';

// Configuração do axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação (se necessário)
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar lógica para incluir token de autenticação
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Serviços para Motos
export const motoService = {
  // Buscar todas as motos
  getAll: async () => {
    try {
      const response = await api.get('/motos');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar motos: ' + error.message);
    }
  },

  // Buscar moto por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/motos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar moto: ' + error.message);
    }
  },

  // Criar nova moto
  create: async (motoData) => {
    try {
      const response = await api.post('/motos', motoData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar moto: ' + error.message);
    }
  },

  // Atualizar moto
  update: async (id, motoData) => {
    try {
      const response = await api.put(`/motos/${id}`, motoData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar moto: ' + error.message);
    }
  },

  // Deletar moto
  delete: async (id) => {
    try {
      const response = await api.delete(`/motos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao deletar moto: ' + error.message);
    }
  },
};

// Serviços para Usuários
export const userService = {
  // Buscar todos os usuários
  getAll: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error.message);
    }
  },

  // Buscar usuário por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message);
    }
  },

  // Criar novo usuário
  create: async (userData) => {
    try {
      // Mapear dados do usuário para o formato da API
      const apiUserData = {
        login: userData.email || userData.name,
        senha: userData.password || '123456', // Senha padrão para novos usuários
      };
      
      const response = await api.post('/users', apiUserData);
      
      // Mapear resposta da API para o formato interno
      return {
        id: response.data.id,
        name: userData.name,
        email: userData.email,
        cpf: userData.cpf,
        phone: userData.phone,
        filial: userData.filial,
        role: userData.role,
        status: userData.status,
        createdAt: response.data.createdAt,
        login: response.data.login,
      };
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  },

  // Atualizar usuário
  update: async (id, userData) => {
    try {
      // Mapear dados do usuário para o formato da API
      const apiUserData = {
        login: userData.email || userData.name,
        senha: userData.password || '123456',
      };
      
      const response = await api.put(`/users/${id}`, apiUserData);
      
      // Mapear resposta da API para o formato interno
      return {
        id: response.data.id,
        name: userData.name,
        email: userData.email,
        cpf: userData.cpf,
        phone: userData.phone,
        filial: userData.filial,
        role: userData.role,
        status: userData.status,
        createdAt: response.data.createdAt,
        login: response.data.login,
      };
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  },

  // Deletar usuário
  delete: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  },
};

// Serviços para Autenticação
export const authService = {
  // Login fake - simula autenticação com a API de usuários
  login: async (email, password) => {
    try {
      // Buscar todos os usuários para verificar credenciais
      const users = await api.get('/users');
      
      // Procurar usuário com login correspondente ao email
      const user = users.data.find(u => u.login === email);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      // Verificar senha (simulação - em produção seria hash)
      if (user.senha !== password) {
        throw new Error('Senha incorreta');
      }
      
      // Retornar dados do usuário autenticado
      return {
        user: {
          id: user.id,
          name: user.login,
          email: user.login,
          role: 'Admin',
          filial: 'Butantã-1',
          createdAt: user.createdAt,
        },
        token: `mock_token_${user.id}_${Date.now()}`,
        expiresIn: 3600, // 1 hora
      };
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  },

  // Logout
  logout: async () => {
    try {
      // Simular logout - em produção invalidaria o token
      return { message: 'Logout realizado com sucesso' };
    } catch (error) {
      throw new Error('Erro ao fazer logout: ' + error.message);
    }
  },

  // Verificar se token é válido
  validateToken: async (token) => {
    try {
      // Simular validação de token
      if (token && token.startsWith('mock_token_')) {
        return { valid: true };
      }
      return { valid: false };
    } catch (error) {
      return { valid: false };
    }
  },
};

// Serviços para Filiais
export const branchService = {
  // Buscar todas as filiais
  getAll: async () => {
    try {
      const response = await api.get('/branches');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar filiais: ' + error.message);
    }
  },

  // Criar nova filial
  create: async (branchData) => {
    try {
      const response = await api.post('/branches', branchData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar filial: ' + error.message);
    }
  },
};

export default api;
