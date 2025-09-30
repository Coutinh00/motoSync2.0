import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity, StatusBar } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { authService } from '../services/api';
import { userStorage } from '../services/storage';
import { validateLogin } from '../services/validation';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Input, Card, Header, GradientBackground, ModernCard } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';
import useResponsive from '../hooks/useResponsive';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const { responsiveSize, responsiveFontSize, getPadding, isSmall, isTablet } = useResponsive();

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

  // Estilos responsivos dinâmicos
  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingHorizontal: getPadding(),
    },
    logoIcon: {
      width: responsiveSize(80),
      height: responsiveSize(80),
      borderRadius: responsiveSize(40),
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: responsiveSize(16),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    logoText: {
      fontSize: responsiveFontSize(32),
      fontWeight: 'bold',
      color: '#ffffff',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    welcomeTitle: {
      fontSize: responsiveFontSize(28),
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 8,
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    welcomeSubtitle: {
      fontSize: responsiveFontSize(16),
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    formContent: {
      padding: responsiveSize(20),
    },
    inputContainer: {
      marginBottom: responsiveSize(20),
    },
  });

  return (
    <GradientBackground 
      colors={theme.colors.background.gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <SafeAreaView style={dynamicStyles.safeArea}>
        {/* Header com Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={dynamicStyles.logoIcon}>
              <MaterialCommunityIcons name="motorbike" size={responsiveSize(40)} color={theme.colors.white} />
            </View>
            <Text style={dynamicStyles.logoText}>MotoSync</Text>
          </View>
        </View>

        {/* Seção de Boas-vindas */}
        <View style={styles.welcomeSection}>
          <Text style={dynamicStyles.welcomeTitle}>Bem-vindo de volta!</Text>
          <Text style={dynamicStyles.welcomeSubtitle}>Acesse sua conta para continuar</Text>
        </View>

        {/* Card de Login */}
        <ModernCard style={styles.formCard} gradient={true} gradientColors={theme.colors.primaryGradient}>
          <View style={dynamicStyles.formContent}>
            <View style={dynamicStyles.inputContainer}>
              <Input
                label="Email"
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                required
                leftIcon={<MaterialCommunityIcons name="email-outline" size={responsiveSize(20)} color={theme.colors.white} />}
                style={styles.input}
              />
            </View>

            <View style={dynamicStyles.inputContainer}>
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
                required
                leftIcon={<Feather name="lock" size={responsiveSize(20)} color={theme.colors.white} />}
                style={styles.input}
              />
            </View>

            <Button
              title={loading ? 'Entrando...' : 'Entrar'}
              onPress={handleLogin}
              disabled={loading}
              variant={loading ? 'disabled' : 'primary'}
              size="large"
              style={styles.loginButton}
            />
          </View>
        </ModernCard>

        {/* Seção de Rodapé */}
        <View style={styles.footerSection}>
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountText}>Não tem uma conta?</Text>
            <Text style={styles.noAccountText}>Contate um administrador.</Text>
          </View>
        </View>

        <LoadingSpinner visible={loading} message="Fazendo login..." />
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formCard: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  formContent: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    borderWidth: 0,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordButton: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#ffffff',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  noAccountContainer: {
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen; 