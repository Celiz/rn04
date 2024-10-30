import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/authContext';
import { MainNavigator } from './MainNavigation';
import { AuthNavigator } from './AuthNavigation';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        // Auth Stack
        <>
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      ) : (
        // Main Stack
        <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};
