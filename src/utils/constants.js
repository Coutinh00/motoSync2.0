/**
 * Constantes do MotoSync
 * Define valores constantes utilizados em todo o aplicativo
 */

// Status de Motos
export const MOTO_STATUS = {
  READY: 'ready',
  LIGHT_DAMAGE: 'lightDamage',
  HEAVY_DAMAGE: 'heavyDamage',
  MAINTENANCE: 'maintenance',
  PARKED: 'parked',
};

// Status de Usuários
export const USER_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  INACTIVE: 'inactive',
};

// Roles de Usuários
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
};

// Tipos de Área para Layout de Filial
export const AREA_TYPES = {
  MAINTENANCE: 'maintenance',
  SALES: 'sales',
  PARKING: 'parking',
  OFFICE: 'office',
  STORAGE: 'storage',
  CUSTOM: 'custom',
};

// Configurações da API
export const API_CONFIG = {
  BASE_URL: 'https://68d9a88d90a75154f0dae049.mockapi.io',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Configurações de Storage
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  MOTOS: 'motos',
  USERS: 'users',
  BRANCHES: 'branches',
  SETTINGS: 'settings',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Configurações de Validação
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  CPF_LENGTH: 11,
  PHONE_LENGTH: 11,
  PLATE_LENGTH: 7,
  CHASSIS_MIN_LENGTH: 10,
  RFID_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  EMAIL_MAX_LENGTH: 255,
};

// Configurações de UI
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  REFRESH_INTERVAL: 30000,
  MAX_RETRY_ATTEMPTS: 3,
};

// Mensagens de Erro
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  SERVER_ERROR: 'Erro do servidor. Tente novamente.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique os campos.',
  AUTH_ERROR: 'Erro de autenticação. Faça login novamente.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.',
};

// Mensagens de Sucesso
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Salvo com sucesso!',
  UPDATE_SUCCESS: 'Atualizado com sucesso!',
  DELETE_SUCCESS: 'Excluído com sucesso!',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
};

// Configurações de Paginação
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
};

// Configurações de Cache
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300000, // 5 minutos
  MAX_SIZE: 50,
  CLEANUP_INTERVAL: 600000, // 10 minutos
};

// Configurações de Notificação
export const NOTIFICATION_CONFIG = {
  DEFAULT_DURATION: 3000,
  SUCCESS_DURATION: 2000,
  ERROR_DURATION: 5000,
};

// Configurações de Upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  MAX_FILES: 5,
};

// Configurações de Relatório
export const REPORT_CONFIG = {
  DEFAULT_FORMAT: 'pdf',
  SUPPORTED_FORMATS: ['pdf', 'excel', 'csv'],
  MAX_RECORDS: 10000,
};

// Configurações de Backup
export const BACKUP_CONFIG = {
  AUTO_BACKUP_INTERVAL: 24 * 60 * 60 * 1000, // 24 horas
  MAX_BACKUP_FILES: 7,
  BACKUP_RETENTION_DAYS: 30,
};

// Configurações de Sincronização
export const SYNC_CONFIG = {
  SYNC_INTERVAL: 5 * 60 * 1000, // 5 minutos
  MAX_SYNC_RETRIES: 3,
  SYNC_BATCH_SIZE: 50,
};

// Configurações de Performance
export const PERFORMANCE_CONFIG = {
  IMAGE_QUALITY: 0.8,
  THUMBNAIL_SIZE: 150,
  LAZY_LOAD_THRESHOLD: 100,
};

// Configurações de Acessibilidade
export const ACCESSIBILITY_CONFIG = {
  MIN_TOUCH_TARGET: 44,
  MIN_FONT_SIZE: 14,
  MAX_CONTRAST_RATIO: 4.5,
};

// Configurações de Segurança
export const SECURITY_CONFIG = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
};

export default {
  MOTO_STATUS,
  USER_STATUS,
  USER_ROLES,
  AREA_TYPES,
  API_CONFIG,
  STORAGE_KEYS,
  VALIDATION_RULES,
  UI_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  PAGINATION,
  CACHE_CONFIG,
  NOTIFICATION_CONFIG,
  UPLOAD_CONFIG,
  REPORT_CONFIG,
  BACKUP_CONFIG,
  SYNC_CONFIG,
  PERFORMANCE_CONFIG,
  ACCESSIBILITY_CONFIG,
  SECURITY_CONFIG,
};
