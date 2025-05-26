import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Picker } from 'react-native';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Português');

  // Placeholder function for logout
  const handleLogout = () => {
    console.log('Usuário deslogado');
    // Implementar a lógica de logout e navegação para a tela de Login
    navigation.navigate('Login');
  };

  // Placeholder function for editing branch layout
  const handleEditLayout = () => {
    console.log('Editar layout da filial');
    // Implementar navegação para a tela de edição de layout da filial
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />{/* Espaço reservado */}
      </View>

      {/* User Info Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.userInfo}>
          {/* User Icon Placeholder */}
          <View style={styles.userIconPlaceholder}>
            {/* Pode ser uma imagem ou ícone */}
            <Feather name="user" size={40} color="gray" />
          </View>
          <View>
            <Text style={styles.userName}>Alex Ramires</Text>
            <Text style={styles.userContact}>alex.ramires@email.com</Text>
            <Text style={styles.userContact}>Branch: São Paulo - Zona Norte</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="black" style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Branch Configuration Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
           <Feather name="settings" size={20} color="gray" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Configurações de filial</Text>
        </View>
        <Text style={styles.branchInfo}>Filial atual: São Paulo - Zona Norte</Text>
        <TouchableOpacity style={styles.editLayoutButton} onPress={handleEditLayout}>
           <MaterialIcons name="grid-on" size={20} color="#007BFF" style={styles.editLayoutIcon} />
          <Text style={styles.editLayoutButtonText}>Editar layout da filial</Text>
        </TouchableOpacity>
        <Text style={styles.editLayoutDescription}>Personalize o layout desta filial e organize visualmente áreas como manutenção, estacionamento e vendas</Text>
      </View>

      {/* General Settings Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.settingItem}>
           <Feather name="bell" size={20} color="gray" style={styles.settingIcon} />
          <Text style={styles.settingText}>Habilitar notificações</Text>
          <Switch
            onValueChange={setIsNotificationsEnabled}
            value={isNotificationsEnabled}
          />
        </View>
        <View style={styles.settingItem}>
           <Feather name="moon" size={20} color="gray" style={styles.settingIcon} />
          <Text style={styles.settingText}>Modo escuro</Text>
          <Switch
            onValueChange={setIsDarkModeEnabled}
            value={isDarkModeEnabled}
          />
        </View>
        <View style={styles.settingItem}>
           <Feather name="globe" size={20} color="gray" style={styles.settingIcon} />
          <Text style={styles.settingText}>Linguagem</Text>
          {/* Placeholder para Picker/Dropdown de idioma */}
           <View style={styles.languagePickerContainer}>
             <Picker
               selectedValue={selectedLanguage}
               style={styles.languagePicker}
               onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
             >
               <Picker.Item label="Português" value="portugues" />
               {/* Adicionar outras opções de idioma aqui */}
             </Picker>
             <Feather name="chevron-down" size={20} color="gray" style={styles.languagePickerIcon} />
           </View>
        </View>
         <View style={styles.settingItem}>
            <Feather name="info" size={20} color="gray" style={styles.settingIcon} />
           <Text style={styles.settingText}>Versão do aplicativo</Text>
           <Text style={styles.appVersionText}>v3.2.0 (2025)</Text>
         </View>
      </View>

      {/* Copyright */}
      <Text style={styles.copyright}>MotoSync © 2025</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
   header: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     paddingHorizontal: 10,
     paddingTop: 10,
     marginBottom: 20,
   },
   headerTitle: {
     fontSize: 20,
     fontWeight: 'bold',
   },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userContact: {
    fontSize: 14,
    color: 'gray',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
   logoutIcon: {
     marginRight: 5,
   },
  logoutButtonText: {
    fontSize: 16,
    color: 'black',
  },
  sectionHeader: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 10,
   },
   sectionIcon: {
     marginRight: 10,
   },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  branchInfo: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  editLayoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f0ff', // Cor de fundo clara para o botão
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
  },
   editLayoutIcon: {
     marginRight: 5,
   },
  editLayoutButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  editLayoutDescription: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
   settingIcon: {
     marginRight: 10,
   },
  settingText: {
    fontSize: 16,
    flex: 1,
  },
   languagePickerContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 5,
     paddingHorizontal: 5,
     // Ajustar largura conforme necessário
   },
   languagePicker: {
     height: 40,
     width: 120,
     // Ajustar conforme necessário
   },
   languagePickerIcon: {
     marginLeft: -25,
     // Ajustar posição para sobrepor o picker nativo
   },
   appVersionText: {
     fontSize: 14,
     color: 'gray',
   },
  copyright: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SettingsScreen; 