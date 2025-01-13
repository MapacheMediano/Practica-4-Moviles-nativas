import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CerrarSesion = ({ navigation, actLogout }) => {
  const handleCerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('user');
      Alert.alert('Sesión cerrada', '¡Hasta luego!');
      // Redirige al inicio después de cerrar sesión
      navigation.navigate('Inicio');
      // Actualiza el estado en App.js para reflejar el cierre de sesión
      actLogout();
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      Alert.alert('Error', 'Error al cerrar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Estás seguro que deseas cerrar sesión?</Text>
      <Button title="Cerrar Sesión" onPress={handleCerrarSesion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35ace4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CerrarSesion;
