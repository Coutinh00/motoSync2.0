import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { ThemeProvider } from './src/contexts/ThemeContext';

import LoginScreen from './src/screens/LoginScreen';
import FleetScreen from './src/screens/FleetScreen';
import UserScreen from './src/screens/UserScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MotoDetailsScreen from './src/screens/MotoDetailsScreen';
import AddMotoScreen from './src/screens/AddMotoScreen';
import EditMotoScreen from './src/screens/EditMotoScreen';
import AddUserScreen from './src/screens/AddUserScreen';
import EditUserScreen from './src/screens/EditUserScreen';
import CreateBranchLayoutScreen from './src/screens/CreateBranchLayoutScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Motos') {
            iconName = focused ? 'motorbike' : 'motorbike'; // Usando o mesmo ícone por enquanto
          } else if (route.name === 'Usuário') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Configurações') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={FleetScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Motos" component={FleetScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Usuário" component={UserScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Configurações" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="MotoDetails" component={MotoDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddMoto" component={AddMotoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditMoto" component={EditMotoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditUser" component={EditUserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateBranchLayout" component={CreateBranchLayoutScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
