// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/createClient';
import { Session, User } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir el tipo para el contexto
type AuthContextData = {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    isAdmin: boolean;
};

// Crear el contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Escucha los cambios en la sesión
        supabase.auth.onAuthStateChange((event, session) => {
          setUser(session?.user ?? null);
        });
      }, []);

    // Iniciar sesión
    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Registrarse
    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true);
            const { error, data: { user: newUser } } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) throw error;

            // Crear perfil del usuario
            if (newUser) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: newUser.id,
                            email: email,
                            role: 'follower', // rol por defecto
                        }
                    ]);

                if (profileError) throw profileError;
            }
        } catch (error) {
            console.error('Error al registrarse:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Cerrar sesión
    const signOut = async () => {
        try {
            setLoading(true);
            console.log('Estado antes de cerrar sesión:', {
                user: user?.email,
                session: session?.access_token,
                isAdmin
            });

            // 1. Primero cerrar sesión en Supabase
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error en supabase.auth.signOut:', error);
                throw error;
            }

            console.log('Sesión cerrada en Supabase exitosamente');

            // 2. Limpiar AsyncStorage
            try {
                await AsyncStorage.removeItem('supabase.auth.token');
                console.log('Token removido de AsyncStorage');
            } catch (storageError) {
                console.error('Error al limpiar AsyncStorage:', storageError);
            }

            // 3. Limpiar el estado local después de confirmar que todo salió bien
            setUser(null);
            setSession(null);
            setIsAdmin(false);

            console.log('Estado local limpiado exitosamente');

            // 4. Forzar una actualización del estado de autenticación
            await supabase.auth.refreshSession();
            console.log('Sesión actualizada');

        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Recuperar contraseña
    const forgotPassword = async (email: string) => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) throw error;
        } catch (error) {
            console.error('Error al enviar email de recuperación:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            session,
            loading,
            signIn,
            signUp,
            signOut,
            forgotPassword,
            isAdmin,
        }}>
            {children}
        </AuthContext.Provider>
    );
};