// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { supabase } from '../../lib/createClient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/authContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp<any>>();
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        try {
            setLoading(true);
            await signIn(email, password);
            // No necesitas navegar manualmente, el RootNavigator lo hará automáticamente
            // cuando el estado del usuario cambie
        } catch (error) {
            console.error('Error en login:', error);
            Alert.alert(
                'Error',
                'No se pudo iniciar sesión. Por favor verifica tus credenciales.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                editable={!loading}
            />
            <Button
                title={loading ? "Cargando..." : "Login"}
                onPress={handleLogin}
                disabled={loading}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.link}
                disabled={loading}
            >
                <Text>Registrarme</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.link}
                disabled={loading}
            >
                <Text>Olvidé mi contraseña</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    link: {
      marginTop: 15,
      alignItems: 'center',
    }
  });
export default LoginScreen;