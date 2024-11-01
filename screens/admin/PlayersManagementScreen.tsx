// PlayersManagementScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Player } from '../../types';


const PlayersManagementScreen = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    return (
        <View style={styles.container}>
            <FlatList
                data={players}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.playerName}>{`${item.name} ${item.surname}`}</Text>
                            <Text style={styles.playerInfo}>{`#${item.jersey_number} - ${item.position}`}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => {/* Delete logic */}}
                        >
                            <Text style={styles.deleteText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#34D399',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teamIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#ddd',
        borderRadius: 20,
    },
    teamName: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
    },
    playerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    playerInfo: {
        fontSize: 14,
        color: '#666',
    },
    matchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    matchContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    stadiumText: {
        fontSize: 14,
        color: '#666',
    },
    teamText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    vsText: {
        fontSize: 16,
        color: '#666',
    },
    emailText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    roleText: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    roleButton: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 6,
        marginRight: 10,
    },
    roleButtonText: {
        color: '#666',
    },
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        color: '#ff4444',
        fontWeight: 'bold',
    },
});

export default PlayersManagementScreen;