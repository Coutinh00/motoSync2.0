import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente de Loading Reutilizável
 * Suporta diferentes tipos de loading e mensagens personalizadas
 */
const LoadingSpinner = ({
  visible = false,
  message = 'Carregando...',
  type = 'spinner', // 'spinner', 'dots', 'pulse'
  size = 'large',
  color,
  overlay = true,
  style,
  textStyle,
}) => {
  const theme = useTheme();

  const getSpinnerColor = () => {
    if (color) return color;
    return theme.colors.primary;
  };

  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, { backgroundColor: getSpinnerColor() }]} />
            <View style={[styles.dot, { backgroundColor: getSpinnerColor() }]} />
            <View style={[styles.dot, { backgroundColor: getSpinnerColor() }]} />
          </View>
        );
      case 'pulse':
        return (
          <View style={[styles.pulseContainer, { backgroundColor: getSpinnerColor() }]} />
        );
      default:
        return (
          <ActivityIndicator 
            size={size} 
            color={getSpinnerColor()} 
          />
        );
    }
  };

  const content = (
    <View style={[styles.container, style]}>
      {renderSpinner()}
      {message && (
        <Text style={[styles.message, theme.text.secondary, textStyle]}>
          {message}
        </Text>
      )}
    </View>
  );

  if (overlay) {
    return (
      <Modal
        transparent
        visible={visible}
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            {content}
          </View>
        </View>
      </Modal>
    );
  }

  return visible ? content : null;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    opacity: 0.7,
  },
  pulseContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.6,
  },
});

export default LoadingSpinner;