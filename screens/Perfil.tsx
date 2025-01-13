import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

import {getUsuario} from '../src/api/users';
import AsyncStorage from '@react-native-async-storage/async-storage';



const UserProfile = () => {
  // Estado para almacenar los datos del usuario y el estado de carga
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los datos del usuario desde la API
    const fetchUserProfile = async () => {
      try {
        // Reemplaza con tu URL de API
        const response = await getUsuario(JSON.parse(await AsyncStorage.getItem('user')));
        
        // Guardamos los datos del usuario en el estado
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Mientras se está cargando, mostramos un indicador de carga
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  // Si no se encuentra el usuario, mostramos un mensaje
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No se pudo cargar el perfil del usuario</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Imagen de perfil - Imagen local */}
      <Image
        source={require('../assets/profile-placeholder.png')} // Ruta de la imagen local
        style={styles.profileImage}
      />
      
      {/* Nombre de usuario */}
      <Text style={styles.username}>{user.name}</Text>

      {/* Descripción del usuario */}
      <Text style={styles.description}>{user.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default UserProfile;
