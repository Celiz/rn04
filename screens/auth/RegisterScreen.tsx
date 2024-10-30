import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '../../context/authContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleRegister = async () => {
    try {
      await signUp(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al registrarse');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={styles.link}
      >
        <Text>¿Ya tienes cuenta? Inicia sesión</Text>
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

export default RegisterScreen;