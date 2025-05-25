import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditUserScreen = ({ route }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Tela de Editar Usuário</Text>
      <Text>Editando usuário com ID: {userId}</Text>
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

export default EditUserScreen; 