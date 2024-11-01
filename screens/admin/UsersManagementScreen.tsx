import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { User, Player, Team } from '../../types';
import { useUserManagement } from '../../hooks/useUserManagment';

interface CreateUserForm {
  email: string;
  role: 'player' | 'team';
  // Campos específicos para jugadores
  name?: string;
  surname?: string;
  jerseyNumber?: string;
  age?: string;
  position?: string;
  // Campos específicos para equipos
  teamName?: string;
  teamShield?: string;
}

const UsersManagementScreen = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { createUserWithRole } = useUserManagement();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'player' as 'player' | 'team',
        name: '',
        surname: '',
        jerseyNumber: '',
        age: '',
        position: '',
        teamName: '',
        teamShield: '',
    });

    const handleCreateUser = async () => {
        try {
            console.log('Creating user with data:', JSON.stringify(formData, null, 2));
            
            if (formData.role === 'player') {
                const result = await createUserWithRole({
                    email: formData.email,
                    password: formData.password,
                    role: 'player',
                    playerData: {
                        name: formData.name,
                        surname: formData.surname,
                        jersey_number: parseInt(formData.jerseyNumber) || 0,
                        age: parseInt(formData.age) || 0,
                        position: formData.position,
                    },
                });
                console.log('Player creation result:', result);
            } else {
                const result = await createUserWithRole({
                    email: formData.email,
                    password: formData.password,
                    role: 'team',
                    teamData: {
                        name: formData.teamName,
                        team_shield: formData.teamShield,
                    },
                });
                console.log('Team creation result:', result);
            }
    
            setShowForm(false);
            Alert.alert('Éxito', 'Usuario creado correctamente');
        } catch (error) {
            console.error('Error creating user:', error);
            Alert.alert('Error', `No se pudo crear el usuario: ${(error as Error).message}`);
        }
    };

    const renderForm = () => (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={formData.password}
                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                secureTextEntry
            />
            
            <TouchableOpacity
                style={[
                    styles.roleSelector,
                    formData.role === 'player' && styles.roleSelectorActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, role: 'player' }))}
            >
                <Text>Jugador</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={[
                    styles.roleSelector,
                    formData.role === 'team' && styles.roleSelectorActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, role: 'team' }))}
            >
                <Text>Equipo</Text>
            </TouchableOpacity>

            {formData.role === 'player' && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={formData.name}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        value={formData.surname}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, surname: text }))}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número de camiseta"
                        value={formData.jerseyNumber}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, jerseyNumber: text }))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Edad"
                        value={formData.age}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Posición"
                        value={formData.position}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, position: text }))}
                    />
                </>
            )}

            {formData.role === 'team' && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del equipo"
                        value={formData.teamName}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, teamName: text }))}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="URL del escudo"
                        value={formData.teamShield}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, teamShield: text }))}
                    />
                </>
            )}

            <TouchableOpacity 
                style={styles.submitButton}
                onPress={() => handleCreateUser()}
            >
                <Text style={styles.submitButtonText}>Crear Usuario</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => setShowForm(!showForm)}
                >
                    <Text style={styles.buttonText}>
                        {showForm ? 'Cancelar' : 'Agregar Usuario'}
                    </Text>
                </TouchableOpacity>
            </View>

            {showForm ? renderForm() : (
                <FlatList
                    data={users}
                    style={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={styles.emailText}>{item.email}</Text>
                                <Text style={styles.roleText}>{item.role}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.user.toString()}
                />
            )}
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

    formContainer: {
        padding: 20,
    },
    roleSelector: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    roleSelectorActive: {
        backgroundColor: '#e8e8e8',
        borderColor: '#34D399',
    },
    submitButton: {
        backgroundColor: '#34D399',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },


});

export default UsersManagementScreen;