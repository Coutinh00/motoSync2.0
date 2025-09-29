/**
 * Componente Card Reutilizável
 * Card padronizado com diferentes variantes baseadas no tema
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente Card
 * @param {Object} props - Props do componente
 * @param {string} props.variant - Variante do card (default, elevated, outlined)
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @param {Object} props.style - Estilos adicionais
 * @param {Function} props.onPress - Função chamada ao pressionar (opcional)
 * @returns {React.ReactNode} Componente Card
 */
const Card = ({
  variant = 'default',
  children,
  style,
  onPress,
  ...props
}) => {
  const theme = useTheme();
  
  // Determina o estilo baseado na variante
  const getCardStyle = () => {
    const baseStyle = theme.components.card;
    const variantStyle = getVariantStyle(variant, theme);
    
    return [baseStyle, variantStyle, style];
  };
  
  if (onPress) {
    const { TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity
        style={getCardStyle()}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={getCardStyle()} {...props}>
      {children}
    </View>
  );
};

/**
 * Retorna estilos baseados na variante do card
 * @param {string} variant - Variante do card
 * @param {Object} theme - Tema atual
 * @returns {Object} Estilos da variante
 */
const getVariantStyle = (variant, theme) => {
  switch (variant) {
    case 'elevated':
      return {
        shadowColor: theme.colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: theme.spacing.elevation.md,
      };
    case 'outlined':
      return {
        borderWidth: theme.spacing.border.width.medium,
        borderColor: theme.colors.border.medium,
        shadowOpacity: 0,
        elevation: 0,
      };
    default: // default
      return {
        shadowColor: theme.colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: theme.spacing.elevation.sm,
      };
  }
};

export default Card;
