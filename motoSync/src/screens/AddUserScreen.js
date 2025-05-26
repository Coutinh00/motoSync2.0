import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddUserScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Adicionar Usuário</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddUserScreen; 