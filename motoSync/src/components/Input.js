/**
 * Componente Input Reutilizável
 * Campo de entrada padronizado com validação e tema
 */

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente Input
 * @param {Object} props - Props do componente
 * @param {string} props.label - Label do input
 * @param {string} props.placeholder - Placeholder do input
 * @param {string} props.value - Valor do input
 * @param {Function} props.onChangeText - Função chamada ao alterar texto
 * @param {string} props.error - Mensagem de erro
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {string} props.keyboardType - Tipo de teclado
 * @param {boolean} props.secureTextEntry - Se o texto é seguro (senha)
 * @param {boolean} props.multiline - Se é multiline
 * @param {number} props.numberOfLines - Número de linhas (multiline)
 * @param {Object} props.style - Estilos adicionais
 * @param {Object} props.inputStyle - Estilos do input
 * @param {React.ReactNode} props.leftIcon - Ícone à esquerda
 * @param {React.ReactNode} props.rightIcon - Ícone à direita
 * @returns {React.ReactNode} Componente Input
 */
const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  required = false,
  disabled = false,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  
  // Determina o estilo do input baseado no estado
  const getInputStyle = () => {
    const baseStyle = theme.components.input;
    const focusStyle = isFocused ? theme.components.inputFocused : {};
    const errorStyle = error ? theme.components.inputError : {};
    const disabledStyle = disabled ? { backgroundColor: theme.colors.gray[100] } : {};
    
    return [
      baseStyle,
      focusStyle,
      errorStyle,
      disabledStyle,
      multiline && { height: 'auto', minHeight: 80, textAlignVertical: 'top' },
      inputStyle,
    ];
  };
  
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[theme.text.label, styles.label]}>
          {label}
          {required && <Text style={theme.text.error}> *</Text>}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          placeholderTextColor={theme.colors.text.tertiary}
          {...props}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {error && (
        <Text style={[theme.text.error, styles.errorText]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
