// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';

// Importar las pantallas principales
import MainScreen from '../screens/main/MainScreen';
import TeamsScreen from '../screens/main/TeamsScreen';
import MatchesScreen from '../screens/main/MatchesScreen';
import StatsScreen from '../screens/main/StatsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const { isAdmin } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: 'home' | 'home-outline' | 'people' | 'people-outline' | 'football' | 'football-outline' | 'stats-chart' | 'stats-chart-outline' | 'person' | 'person-outline' | 'alert';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Teams':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Matches':
              iconName = focused ? 'football' : 'football-outline';
              break;
            case 'Stats':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'alert';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MainScreen}
        options={{
          title: 'Inicio'
        }}
      />
      <Tab.Screen 
        name="Teams" 
        component={TeamsScreen}
        options={{
          title: 'Equipos'
        }}
      />
      <Tab.Screen 
        name="Matches" 
        component={MatchesScreen}
        options={{
          title: 'Partidos'
        }}
      />
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen}
        options={{
          title: 'Estadísticas'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Perfil'
        }}
      />
    </Tab.Navigator>
  );
};