import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Match, Team } from '../../types';
import { useTeams } from '../../hooks/useTeams';
import { supabase } from '../../lib/createClient';
import { useMatches } from '../../hooks/useMatches';

const MatchesManagementScreen = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const { teams, loading: teamsLoading } = useTeams();
    const [localTeam, setLocalTeam] = useState<number | undefined>(undefined);
    const [awayTeam, setAwayTeam] = useState<number | undefined>(undefined);
    const [stadium, setStadium] = useState<string>('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);  // Toggle for date picker
    const { createMatch, fetchMatches } = useMatches();

    useEffect(() => {
        fetchMatches();
    }, []);

    const handleAddMatch = () => {
        if (!localTeam || !awayTeam || !stadium || !date) {
            Alert.alert("Please fill all fields");
            return;
        }
        createMatch({ local_team: localTeam, away_team: awayTeam, stadium, date: date.toISOString().split('T')[0] });
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Picker
                    selectedValue={localTeam}
                    onValueChange={(itemValue) => setLocalTeam(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Local Team" value={undefined} />
                    {!teamsLoading && teams.map((team) => (
                        <Picker.Item key={team.id} label={team.name} value={team.id} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={awayTeam}
                    onValueChange={(itemValue) => setAwayTeam(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Away Team" value={undefined} />
                    {!teamsLoading && teams.map((team) => (
                        <Picker.Item key={team.id} label={team.name} value={team.id} />
                    ))}
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Stadium"
                    value={stadium}
                    onChangeText={setStadium}
                />

                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.buttonText}>
                        {date ? date.toDateString() : "Select Date"}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={date || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <TouchableOpacity style={styles.addButton} onPress={handleAddMatch}>
                    <Text style={styles.buttonText}>Programar Partido</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={matches}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.matchHeader}>
                            <Text style={styles.dateText}>{item.date}</Text>
                            <Text style={styles.stadiumText}>{item.stadium}</Text>
                        </View>
                        <View style={styles.matchContent}>
                            <Text style={styles.teamText}>Local</Text>
                            <Text style={styles.scoreText}>{item.local_team_goals}</Text>
                            <Text style={styles.vsText}>vs</Text>
                            <Text style={styles.scoreText}>{item.away_team_goals}</Text>
                            <Text style={styles.teamText}>Visitante</Text>
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    dateButton: {
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
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
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        color: '#ff4444',
        fontWeight: 'bold',
    },
});

export default MatchesManagementScreen;
