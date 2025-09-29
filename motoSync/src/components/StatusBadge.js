/**
 * Componente StatusBadge Reutilizável
 * Badge de status padronizado para motos e usuários
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente StatusBadge
 * @param {Object} props - Props do componente
 * @param {string} props.status - Status do item (ready, lightDamage, heavyDamage, active, pending)
 * @param {string} props.text - Texto do badge (opcional, usa o status se não fornecido)
 * @param {string} props.size - Tamanho do badge (small, medium, large)
 * @param {Object} props.style - Estilos adicionais
 * @returns {React.ReactNode} Componente StatusBadge
 */
const StatusBadge = ({
  status,
  text,
  size = 'medium',
  style,
  ...props
}) => {
  const theme = useTheme();
  
  // Determina o estilo baseado no status
  const getBadgeStyle = () => {
    const baseStyle = theme.statusBadge[status] || theme.statusBadge.active;
    const sizeStyle = getSizeStyle(size, theme);
    
    return [baseStyle, sizeStyle, style];
  };
  
  // Determina o texto do badge
  const getBadgeText = () => {
    if (text) return text;
    
    // Mapeamento de status para texto
    const statusTextMap = {
      ready: 'Prontas',
      lightDamage: 'Dano Leve',
      heavyDamage: 'Dano Grave',
      active: 'Ativo',
      pending: 'Pendente',
    };
    
    return statusTextMap[status] || status;
  };
  
  return (
    <View style={getBadgeStyle()} {...props}>
      <Text style={getBadgeTextStyle(size, theme)}>
        {getBadgeText()}
      </Text>
    </View>
  );
};

/**
 * Retorna estilos baseados no tamanho do badge
 * @param {string} size - Tamanho do badge
 * @param {Object} theme - Tema atual
 * @returns {Object} Estilos do tamanho
 */
const getSizeStyle = (size, theme) => {
  switch (size) {
    case 'small':
      return {
        paddingVertical: 2,
        paddingHorizontal: 6,
        minHeight: 20,
      };
    case 'large':
      return {
        paddingVertical: 6,
        paddingHorizontal: 12,
        minHeight: 32,
      };
    default: // medium
      return {
        paddingVertical: 4,
        paddingHorizontal: 8,
        minHeight: 24,
      };
  }
};

/**
 * Retorna estilos do texto baseados no tamanho do badge
 * @param {string} size - Tamanho do badge
 * @param {Object} theme - Tema atual
 * @returns {Object} Estilos do texto
 */
const getBadgeTextStyle = (size, theme) => {
  const baseStyle = {
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
  };
  
  switch (size) {
    case 'small':
      return {
        ...baseStyle,
        fontSize: theme.typography.fontSize.xs,
      };
    case 'large':
      return {
        ...baseStyle,
        fontSize: theme.typography.fontSize.sm,
      };
    default: // medium
      return {
        ...baseStyle,
        fontSize: theme.typography.fontSize.xs,
      };
  }
};

export default StatusBadge;
