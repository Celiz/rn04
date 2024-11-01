import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/authContext';
import { MainNavigator } from './MainNavigation';
import { AuthNavigator } from './AuthNavigation';
import { AdminNavigator } from './AdminNavigation';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { user, isAdmin } = useAuth();


  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </>
      ) : (
        <>
        {
            isAdmin ? (
                // Admin Stack
                <>
                <Stack.Screen name="Admin" component={AdminNavigator} />
                </>
            ) : (
                // Main Stack
                <>
                <Stack.Screen name="Main" component={MainNavigator} />
                </>
            )
        }
        </>
      )}
    </Stack.Navigator>
  );
};
