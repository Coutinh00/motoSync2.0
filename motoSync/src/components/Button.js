import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente de Botão Reutilizável
 * Suporta diferentes variantes, estados de carregamento e ícones
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  gradient = false,
  ...props
}) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    let baseStyle = [styles.button, theme.components.button[variant]];
    
    if (size === 'small') {
      baseStyle.push(styles.small);
    } else if (size === 'large') {
      baseStyle.push(styles.large);
    }
    
    if (disabled || loading) {
      baseStyle.push(theme.components.button.disabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    let baseStyle = [styles.text];
    
    if (variant === 'outline') {
      baseStyle.push(theme.text.buttonOutline);
    } else {
      baseStyle.push(theme.text.button);
    }
    
    if (size === 'small') {
      baseStyle.push(styles.smallText);
    } else if (size === 'large') {
      baseStyle.push(styles.largeText);
    }
    
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  const renderContent = () => (
    <>
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? theme.colors.primary : theme.colors.white} 
          style={styles.loadingIcon}
        />
      )}
      
      {leftIcon && !loading && (
        <Feather 
          name={leftIcon} 
          size={size === 'small' ? 16 : size === 'large' ? 20 : 18} 
          color={variant === 'outline' ? theme.colors.primary : theme.colors.white}
          style={styles.leftIcon}
        />
      )}
      
      <Text style={getTextStyle()}>
        {title}
      </Text>
      
      {rightIcon && !loading && (
        <Feather 
          name={rightIcon} 
          size={size === 'small' ? 16 : size === 'large' ? 20 : 18} 
          color={variant === 'outline' ? theme.colors.primary : theme.colors.white}
          style={styles.rightIcon}
        />
      )}
    </>
  );

  if (gradient && variant === 'primary' && !disabled && !loading) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyle(), { padding: 0 }]}
        {...props}
      >
        <LinearGradient
          colors={theme.colors.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  loadingIcon: {
    marginRight: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button;