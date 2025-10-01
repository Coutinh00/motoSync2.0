import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const Dropdown = ({
  label,
  value,
  onValueChange,
  options = [],
  placeholder = 'Selecione uma opção',
  error,
  style,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      ...theme.text.label,
      marginBottom: theme.spacing.xs,
    },
    dropdown: {
      ...theme.components.input,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: error ? theme.colors.danger : theme.colors.border.medium,
    },
    dropdownText: {
      ...theme.text.body,
      color: value ? theme.colors.text.primary : theme.colors.text.tertiary,
    },
    chevron: {
      marginLeft: theme.spacing.sm,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.spacing.md,
      padding: theme.spacing.lg,
      width: '80%',
      maxHeight: '60%',
    },
    modalTitle: {
      ...theme.text.h3,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
    },
    option: {
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    optionText: {
      ...theme.text.body,
    },
    selectedOption: {
      backgroundColor: theme.colors.primary + '10',
    },
    selectedOptionText: {
      ...theme.text.body,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    errorText: {
      ...theme.text.error,
      marginTop: theme.spacing.xs,
    },
  });

  const selectedOption = options.find(option => option.value === value);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(true)}
        {...props}
      >
        <Text style={styles.dropdownText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Feather 
          name="chevron-down" 
          size={20} 
          color={theme.colors.text.secondary}
          style={styles.chevron}
        />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecionar {label}</Text>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === value && styles.selectedOption
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    item.value === value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
