import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Platform } from 'react-native';
import { usePlayers } from '../../hooks/usePlayers';
import { Player } from '../../types';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../utils/storage';

const PlayersManagementScreen = () => {
    const { players, loading, createPlayer, deletePlayer, updatePlayer, fetchPlayers } = usePlayers();
    const [uploadingImage, setUploadingImage] = useState<string | null>(null);

    const handleCapturePlayerImage = async (playerId: number) => {
        try {
            // Detect environment
            const isWeb = Platform.OS === 'web';
            if (isWeb && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Attempt to capture with camera in web
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    const track = stream.getVideoTracks()[0];
                    const imageCapture = new (window as any).ImageCapture(track);
                    const blob = await imageCapture.takePhoto();

                    // Assuming blob as an image to be uploaded
                    const imageUri = URL.createObjectURL(blob);
                    setUploadingImage(playerId.toString());
                    const publicUrl = await uploadImage(imageUri, 'player-photos');
                    
                    if (publicUrl) {
                        await updatePlayer(playerId, { image: publicUrl });
                        await fetchPlayers(); // Refresh the players list
                    }
                    track.stop();
                } catch (error) {
                    console.error('Error al capturar imagen en web:', error);
                    alert('Error al capturar la imagen en la web');
                }
            } else {
                // Mobile behavior: request camera permissions and capture image
                const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
                
                if (!permissionResult.granted) {
                    alert('Se necesita permiso para acceder a la cámara');
                    return;
                }

                const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });

                if (!result.canceled && result.assets[0]) {
                    const imageUri = result.assets[0].uri;
                    setUploadingImage(playerId.toString());
                    const publicUrl = await uploadImage(imageUri, 'player-photos');

                    if (publicUrl) {
                        await updatePlayer(playerId, { image: publicUrl });
                        await fetchPlayers(); // Refresh the players list
                    }
                }
            }
        } catch (error) {
            console.error('Error al capturar imagen:', error);
            alert('Error al capturar la imagen');
        } finally {
            setUploadingImage(null);
        }
    };

    const renderPlayerIcon = (player: Player) => {
        if (uploadingImage === player.id.toString()) {
            return (
                <View style={styles.playerIcon}>
                    <ActivityIndicator color="#34D399" />
                </View>
            );
        }

        if (player.image) {
            return (
                <TouchableOpacity onPress={() => handleCapturePlayerImage(player.id)}>
                    <Image 
                        source={{ uri: player.image }} 
                        style={styles.playerIcon}
                    />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity 
                style={styles.playerIconPlaceholder}
                onPress={() => handleCapturePlayerImage(player.id)}
            >
                <Text style={styles.uploadText}>+</Text>
            </TouchableOpacity>
        );
    };

    const renderPlayerItem = ({ item }: { item: Player }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {renderPlayerIcon(item)}
                <Text style={styles.playerName}>{item.name}</Text>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => deletePlayer(item.id)}
                >
                    <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#34D399" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={players}
                style={styles.list}
                renderItem={renderPlayerItem}
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
    playerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },
    uploadText: {
        fontSize: 24,
        color: '#666',
    },
    playerName: {
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

export default PlayersManagementScreen;
