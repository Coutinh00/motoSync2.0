/**
 * Contexto de Tema do MotoSync
 * Fornece acesso ao tema global em toda a aplicação
 */

import React, { createContext, useContext } from 'react';
import theme from '../theme';

const ThemeContext = createContext(theme);

/**
 * Hook para usar o tema em componentes funcionais
 * @returns {Object} Tema atual
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

/**
 * Provider do tema
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 * @returns {React.ReactNode} Provider do tema
 */
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
