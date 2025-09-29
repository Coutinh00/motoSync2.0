/**
 * Sistema de Cores do MotoSync
 * Define todas as cores utilizadas no aplicativo para manter consistência visual
 */

export const colors = {
  // Cores Primárias
  primary: '#007BFF',
  primaryDark: '#0056B3',
  primaryLight: '#4DA6FF',
  
  // Cores Secundárias
  secondary: '#6C757D',
  secondaryDark: '#495057',
  secondaryLight: '#ADB5BD',
  
  // Cores de Status
  success: '#28A745',
  successLight: '#D4EDDA',
  successDark: '#155724',
  
  warning: '#FFC107',
  warningLight: '#FFF3CD',
  warningDark: '#856404',
  
  danger: '#DC3545',
  dangerLight: '#F8D7DA',
  dangerDark: '#721C24',
  
  info: '#17A2B8',
  infoLight: '#D1ECF1',
  infoDark: '#0C5460',
  
  // Cores Neutras
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F8F9FA',
    100: '#E9ECEF',
    200: '#DEE2E6',
    300: '#CED4DA',
    400: '#ADB5BD',
    500: '#6C757D',
    600: '#495057',
    700: '#343A40',
    800: '#212529',
    900: '#1A1A1A',
  },
  
  // Cores de Fundo
  background: {
    primary: '#F0F0F0',
    secondary: '#FFFFFF',
    tertiary: '#F8F9FA',
  },
  
  // Cores de Texto
  text: {
    primary: '#212529',
    secondary: '#6C757D',
    tertiary: '#ADB5BD',
    inverse: '#FFFFFF',
    link: '#007BFF',
  },
  
  // Cores de Borda
  border: {
    light: '#E9ECEF',
    medium: '#CED4DA',
    dark: '#ADB5BD',
  },
  
  // Cores de Status Específicas para Motos
  motoStatus: {
    ready: '#28A745',      // Prontas
    lightDamage: '#FFC107', // Dano Leve
    heavyDamage: '#DC3545', // Dano Grave
    maintenance: '#17A2B8', // Manutenção
    parked: '#6C757D',     // Estacionada
  },
  
  // Cores de Status para Usuários
  userStatus: {
    active: '#28A745',     // Ativo
    pending: '#FFC107',    // Pendente
    inactive: '#DC3545',   // Inativo
  },
  
  // Cores de Função/Role
  userRole: {
    admin: '#007BFF',       // Admin
    user: '#6C757D',       // Usuário
    manager: '#28A745',    // Gerente
  },
};

export default colors;
