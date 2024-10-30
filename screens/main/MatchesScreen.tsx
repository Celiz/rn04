import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MatchesScreen = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Fixture</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fecha 1</Text>
          <Text style={styles.cardText}>River vs Boca</Text>
          <Text style={styles.cardText}>Racing vs San Lorenzo</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fecha 2</Text>
          <Text style={styles.cardText}>Boca vs Racing</Text>
          <Text style={styles.cardText}>San Lorenzo vs River</Text>
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

export default MatchesScreen;