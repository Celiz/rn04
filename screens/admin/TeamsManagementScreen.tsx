import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTeams } from '../../hooks/useTeams';
import { Team } from '../../types';

const TeamsManagementScreen = () => {
    const { teams, loading, createTeam, updateTeam, deleteTeam } = useTeams();

    const handleAddTeam = () => {
        createTeam({ name: 'Nuevo equipo' });
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={teams}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <View style={styles.teamIcon} />
                            <Text style={styles.teamName}>{item.name}</Text>
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={() => deleteTeam(item.id)}
                            >
                                <Text style={styles.deleteText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
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
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        color: '#ff4444',
        fontWeight: 'bold',
    },
});

export default TeamsManagementScreen;