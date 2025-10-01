import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../services/api';
import { userStorage } from '../services/storage';
import { validateLogin } from '../services/validation';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    console.log('Tentando fazer login com:', email, password);
    
    // Limpar erros anteriores
    setErrors({});

    // Validação dos campos
    const validation = validateLogin(email, password);
    if (!validation.isValid) {
      console.log('Erro de validação:', validation.errors);
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      // Tentar fazer login via API
      console.log('Tentando login via API...');
      const response = await authService.login(email, password);
      
      // Salvar dados do usuário e token no AsyncStorage
      await userStorage.saveUserData(response.user);
      await userStorage.saveToken(response.token);
      
      console.log('Login via API bem-sucedido, navegando...');
      // Navegar para a tela principal
      navigation.navigate('Main');
    } catch (error) {
      console.log('Erro na API, tentando login mock:', error.message);
      // Se a API falhar, usar credenciais de exemplo para demonstração
      const exampleEmail = 'teste@example.com';
      const examplePassword = '123456';

      console.log('Verificando credenciais:', email === exampleEmail, password === examplePassword);

      if (email === exampleEmail && password === examplePassword) {
        console.log('Credenciais corretas, criando usuário mock...');
        // Simular dados do usuário para demonstração
        const mockUser = {
          id: '1',
          name: 'Usuário Teste',
          email: email,
          role: 'Admin',
          filial: 'Butantã-1'
        };

        await userStorage.saveUserData(mockUser);
        await userStorage.saveToken('mock_token_123');
        
        console.log('Usuário mock criado, navegando...');
        navigation.navigate('Main');
      } else {
        console.log('Credenciais incorretas');
        Alert.alert('Erro de Login', 'Email ou senha incorretos. Tente: teste@example.com / 123456');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="motorbike" size={24} color="#000000" />
          <Text style={styles.logoText}>MotoSync</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="menu" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Título de Boas-vindas */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bem vindo de volta</Text>
          <Text style={styles.welcomeSubtitle}>Acesse sua conta</Text>
        </View>

        {/* Card de Login */}
        <View style={styles.loginCard}>
          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Feather name="mail" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Feather name="help-circle" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#9CA3AF"
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Botão de Login */}
          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <Text style={styles.noAccountText}>Não tem uma conta? Contate um administrador.</Text>
        </View>
      </View>

      <LoadingSpinner visible={loading} message="Fazendo login..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 8,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  loginCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  footer: {
    alignItems: 'center',
  },
  forgotPasswordButton: {
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  noAccountText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen; 