/**
 * Componente Header Reutilizável
 * Header padronizado para todas as telas
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente Header
 * @param {Object} props - Props do componente
 * @param {string} props.title - Título do header
 * @param {Function} props.onBack - Função chamada ao pressionar voltar
 * @param {React.ReactNode} props.leftIcon - Ícone à esquerda (opcional)
 * @param {React.ReactNode} props.rightIcon - Ícone à direita (opcional)
 * @param {Function} props.onRightPress - Função chamada ao pressionar ícone direito
 * @param {boolean} props.showBack - Se deve mostrar botão de voltar
 * @param {Object} props.style - Estilos adicionais
 * @returns {React.ReactNode} Componente Header
 */
const Header = ({
  title,
  onBack,
  leftIcon,
  rightIcon,
  onRightPress,
  showBack = true,
  style,
  ...props
}) => {
  const theme = useTheme();
  
  const getHeaderStyle = () => {
    return [theme.components.header, style];
  };
  
  const getTitleStyle = () => {
    return [theme.text.title, styles.title];
  };
  
  return (
    <View style={getHeaderStyle()} {...props}>
      <View style={styles.leftContainer}>
        {showBack && onBack && (
          <TouchableOpacity onPress={onBack} style={styles.iconButton}>
            <Feather name="arrow-left" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
        {leftIcon && (
          <TouchableOpacity onPress={onBack} style={styles.iconButton}>
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={getTitleStyle()}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            {rightIcon}
          </TouchableOpacity>
        )}
        {!rightIcon && <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  placeholder: {
    width: 40,
  },
});

export default Header;
