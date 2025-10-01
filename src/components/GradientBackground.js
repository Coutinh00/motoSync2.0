/**
 * Componente GradientBackground
 * Cria fundos com gradientes modernos para o MotoSync
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente GradientBackground
 * @param {Object} props - Props do componente
 * @param {Array} props.colors - Array de cores para o gradiente
 * @param {string} props.direction - Direção do gradiente (horizontal, vertical, diagonal)
 * @param {Object} props.style - Estilos adicionais
 * @param {React.ReactNode} props.children - Conteúdo do componente
 * @returns {React.ReactNode} Componente GradientBackground
 */
const GradientBackground = ({
  colors: gradientColors,
  direction = 'vertical',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  
  // Cores padrão se não fornecidas
  const defaultColors = gradientColors || theme.colors.primaryGradient;
  
  // Configuração da direção do gradiente
  const getGradientProps = () => {
    switch (direction) {
      case 'horizontal':
        return {
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        };
      case 'diagonal':
        return {
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
        };
      default: // vertical
        return {
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        };
    }
  };

  return (
    <LinearGradient
      colors={defaultColors}
      {...getGradientProps()}
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
