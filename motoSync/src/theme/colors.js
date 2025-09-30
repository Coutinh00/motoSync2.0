/**
 * Sistema de Cores Moderno do MotoSync
 * Design system com gradientes, sombras e cores vibrantes
 */

export const colors = {
  // Cores Primárias - Gradiente Azul Moderno
  primary: '#667eea',
  primaryDark: '#5a67d8',
  primaryLight: '#764ba2',
  primaryGradient: ['#667eea', '#764ba2'],
  
  // Cores Secundárias - Gradiente Roxo
  secondary: '#f093fb',
  secondaryDark: '#f5576c',
  secondaryLight: '#4facfe',
  secondaryGradient: ['#f093fb', '#f5576c'],
  
  // Cores de Status - Gradientes Vibrantes
  success: '#4facfe',
  successLight: '#00f2fe',
  successDark: '#43e97b',
  successGradient: ['#43e97b', '#38f9d7'],
  
  warning: '#fad961',
  warningLight: '#f76b1c',
  warningDark: '#fad961',
  warningGradient: ['#fad961', '#f76b1c'],
  
  danger: '#ff6b6b',
  dangerLight: '#ffa8a8',
  dangerDark: '#ee5a52',
  dangerGradient: ['#ff6b6b', '#ee5a52'],
  
  info: '#4facfe',
  infoLight: '#00f2fe',
  infoDark: '#4facfe',
  infoGradient: ['#4facfe', '#00f2fe'],
  
  // Cores Neutras - Tons Modernos
  white: '#FFFFFF',
  black: '#1a1a1a',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Cores de Fundo - Gradientes Suaves
  background: {
    primary: '#f8fafc',
    secondary: '#ffffff',
    tertiary: '#f1f5f9',
    gradient: ['#f8fafc', '#e2e8f0'],
  },
  
  // Cores de Texto - Hierarquia Clara
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    inverse: '#ffffff',
    link: '#667eea',
    accent: '#764ba2',
  },
  
  // Cores de Borda - Suaves
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
  },
  
  // Cores de Status Específicas para Motos - Gradientes
  motoStatus: {
    ready: '#43e97b',      // Prontas - Verde vibrante
    lightDamage: '#fad961', // Dano Leve - Amarelo
    heavyDamage: '#ff6b6b', // Dano Grave - Vermelho
    maintenance: '#4facfe', // Manutenção - Azul
    parked: '#94a3b8',     // Estacionada - Cinza
    readyGradient: ['#43e97b', '#38f9d7'],
    lightDamageGradient: ['#fad961', '#f76b1c'],
    heavyDamageGradient: ['#ff6b6b', '#ee5a52'],
    maintenanceGradient: ['#4facfe', '#00f2fe'],
  },
  
  // Cores de Status para Usuários
  userStatus: {
    active: '#43e97b',     // Ativo
    pending: '#fad961',    // Pendente
    inactive: '#ff6b6b',   // Inativo
    activeGradient: ['#43e97b', '#38f9d7'],
    pendingGradient: ['#fad961', '#f76b1c'],
    inactiveGradient: ['#ff6b6b', '#ee5a52'],
  },
  
  // Cores de Função/Role
  userRole: {
    admin: '#667eea',       // Admin
    user: '#94a3b8',       // Usuário
    manager: '#43e97b',    // Gerente
    adminGradient: ['#667eea', '#764ba2'],
    userGradient: ['#94a3b8', '#64748b'],
    managerGradient: ['#43e97b', '#38f9d7'],
  },
  
  // Cores de Sombras - Modernas
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.15)',
    colored: 'rgba(102, 126, 234, 0.2)',
  },
  
  // Cores de Overlay
  overlay: {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(0, 0, 0, 0.5)',
    primary: 'rgba(102, 126, 234, 0.1)',
  },
};

export default colors;
