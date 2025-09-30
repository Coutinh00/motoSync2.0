/**
 * Componente ModernCard
 * Card moderno com gradientes e sombras para o MotoSync
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente ModernCard
 * @param {Object} props - Props do componente
 * @param {boolean} props.gradient - Se deve usar gradiente
 * @param {Array} props.gradientColors - Cores do gradiente
 * @param {string} props.variant - Variante do card (default, stat, status)
 * @param {boolean} props.pressable - Se o card é clicável
 * @param {Function} props.onPress - Função chamada ao pressionar
 * @param {Object} props.style - Estilos adicionais
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @returns {React.ReactNode} Componente ModernCard
 */
const ModernCard = ({
  gradient = false,
  gradientColors,
  variant = 'default',
  pressable = false,
  onPress,
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  
  // Cores do gradiente baseadas na variante
  const getGradientColors = () => {
    if (gradientColors) return gradientColors;
    
    switch (variant) {
      case 'stat':
        return theme.colors.primaryGradient;
      case 'status':
        return theme.colors.successGradient;
      default:
        return theme.colors.primaryGradient;
    }
  };

  // Estilos baseados na variante
  const getCardStyle = () => {
    const baseStyle = theme.components.card;
    
    switch (variant) {
      case 'stat':
        return [baseStyle, theme.components.statCard];
      case 'status':
        return [baseStyle, theme.components.statusCard];
      default:
        return baseStyle;
    }
  };

  const cardContent = (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );

  if (gradient) {
    return (
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientContainer, style]}
        {...props}
      >
        <View style={styles.gradientContent}>
          {children}
        </View>
      </LinearGradient>
    );
  }

  if (pressable) {
    return (
      <TouchableOpacity
        style={[getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  gradientContent: {
    padding: 20,
    borderRadius: 16,
  },
});

export default ModernCard;
