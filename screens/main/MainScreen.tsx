import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MainScreen = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Próximos Partidos</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>River vs Boca</Text>
          <Text style={styles.cardText}>Fecha: 15/11/2024</Text>
          <Text style={styles.cardText}>Estadio: Monumental</Text>
        </View>

        <Text style={styles.title}>Últimos Resultados</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Racing 2 - 1 San Lorenzo</Text>
          <Text style={styles.cardText}>Fecha: 10/11/2024</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      marginTop: 10,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    cardText: {
      fontSize: 16,
      color: '#666',
      marginBottom: 5,
    },
    button: {
      backgroundColor: '#ff4444',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: 'white',
    },
  });

export default MainScreen;