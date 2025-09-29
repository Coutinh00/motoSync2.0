/**
 * Componente Button Reutilizável
 * Botão padronizado com diferentes variantes baseadas no tema
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente Button
 * @param {Object} props - Props do componente
 * @param {string} props.variant - Variante do botão (primary, secondary, outline, disabled)
 * @param {string} props.size - Tamanho do botão (small, medium, large)
 * @param {string} props.title - Texto do botão
 * @param {Function} props.onPress - Função chamada ao pressionar
 * @param {boolean} props.disabled - Se o botão está desabilitado
 * @param {Object} props.style - Estilos adicionais
 * @param {Object} props.textStyle - Estilos do texto
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @returns {React.ReactNode} Componente Button
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  children,
  ...props
}) => {
  const theme = useTheme();
  
  // Determina o estilo baseado na variante
  const getButtonStyle = () => {
    const baseStyle = theme.components.button[variant] || theme.components.button.primary;
    const sizeStyle = getSizeStyle(size, theme);
    
    return [baseStyle, sizeStyle, disabled && theme.components.button.disabled, style];
  };
  
  // Determina o estilo do texto baseado na variante
  const getTextStyle = () => {
    const baseTextStyle = variant === 'outline' ? theme.text.buttonOutline : theme.text.button;
    const sizeTextStyle = getTextSizeStyle(size, theme);
    
    return [baseTextStyle, sizeTextStyle, textStyle];
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {children || <Text style={getTextStyle()}>{title}</Text>}
    </TouchableOpacity>
  );
};

/**
 * Retorna estilos baseados no tamanho do botão
 * @param {string} size - Tamanho do botão
 * @param {Object} theme - Tema atual
 * @returns {Object} Estilos do tamanho
 */
const getSizeStyle = (size, theme) => {
  switch (size) {
    case 'small':
      return {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        minHeight: 32,
      };
    case 'large':
      return {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        minHeight: 56,
      };
    default: // medium
      return {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 44,
      };
  }
};

/**
 * Retorna estilos de texto baseados no tamanho do botão
 * @param {string} size - Tamanho do botão
 * @param {Object} theme - Tema atual
 * @returns {Object} Estilos do texto
 */
const getTextSizeStyle = (size, theme) => {
  switch (size) {
    case 'small':
      return theme.typography.styles.buttonSmall;
    case 'large':
      return theme.typography.styles.buttonLarge;
    default: // medium
      return theme.typography.styles.button;
  }
};

export default Button;
