import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implementar lógica de login aqui
    console.log('Login pressed', { email, password });

    console.log('Entered Email:', email);
    console.log('Entered Password:', password);

    // Credenciais de exemplo
    const exampleEmail = 'teste@example.com';
    const examplePassword = '123456';

    if (email === exampleEmail && password === examplePassword) {
      // Navegar para a tela principal
      console.log('Login successful!');
      navigation.navigate('Main');
    } else {
      // Exibir mensagem de erro
      Alert.alert('Erro de Login', 'Email ou senha incorretos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Placeholder for MotoSync logo and menu */}
      <View style={styles.header}>
        {/* Replace with actual logo image */}
        <Text style={styles.headerText}>🏍️ MotoSync</Text>
        {/* Menu Icon */}
        <Feather name="menu" size={24} color="black" />
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bem vindo de volta</Text>
        <Text style={styles.welcomeSubtitle}>Acesse sua conta</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <Feather name="help-circle" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerSection}>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <Text style={styles.noAccountText}>Não tem uma conta? Contate um</Text>
        <Text style={styles.noAccountText}>administrador.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerSection: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 16,
    marginBottom: 20,
  },
  noAccountText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});

export default LoginScreen; 