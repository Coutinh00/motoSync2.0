import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../services/api';
import { userStorage } from '../services/storage';
import { validateLogin } from '../services/validation';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Input, Card, Header } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();

  const handleLogin = async () => {
    // Limpar erros anteriores
    setErrors({});

    // Validação dos campos
    const validation = validateLogin(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      // Tentar fazer login via API
      const response = await authService.login(email, password);
      
      // Salvar dados do usuário e token no AsyncStorage
      await userStorage.saveUserData(response.user);
      await userStorage.saveToken(response.token);
      
      // Navegar para a tela principal
      navigation.navigate('Main');
    } catch (error) {
      // Se a API falhar, usar credenciais de exemplo para demonstração
      const exampleEmail = 'teste@example.com';
      const examplePassword = '123456';

      if (email === exampleEmail && password === examplePassword) {
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
        
        navigation.navigate('Main');
      } else {
        Alert.alert('Erro de Login', 'Email ou senha incorretos. Tente: teste@example.com / 123456');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <Header
        title="🏍️ MotoSync"
        rightIcon={<Feather name="menu" size={24} color={theme.colors.text.primary} />}
      />

      <View style={styles.welcomeSection}>
        <Text style={[theme.text.title, styles.welcomeTitle]}>Bem vindo de volta</Text>
        <Text style={[theme.text.subtitle, styles.welcomeSubtitle]}>Acesse sua conta</Text>
      </View>

      <Card style={styles.formCard}>
        <Input
          label="Email"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          required
          leftIcon={<MaterialCommunityIcons name="email-outline" size={20} color={theme.colors.text.tertiary} />}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
          required
          leftIcon={<Feather name="lock" size={20} color={theme.colors.text.tertiary} />}
        />

        <Button
          title={loading ? 'Entrando...' : 'Entrar'}
          onPress={handleLogin}
          disabled={loading}
          variant={loading ? 'disabled' : 'primary'}
          size="large"
          style={styles.loginButton}
        />
      </Card>

      <View style={styles.footerSection}>
        <TouchableOpacity>
          <Text style={[theme.text.link, styles.forgotPasswordText]}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <Text style={[theme.text.secondary, styles.noAccountText]}>Não tem uma conta? Contate um</Text>
        <Text style={[theme.text.secondary, styles.noAccountText]}>administrador.</Text>
      </View>

      <LoadingSpinner visible={loading} message="Fazendo login..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    marginBottom: 5,
  },
  welcomeSubtitle: {
    // Estilos aplicados via theme.text.subtitle
  },
  formCard: {
    marginBottom: 30,
  },
  loginButton: {
    marginTop: 20,
  },
  footerSection: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    marginBottom: 20,
  },
  noAccountText: {
    textAlign: 'center',
  },
});

export default LoginScreen; 