import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { getUsuarios, deleteUsuario } from '../src/api/users';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const ListaUsuarios = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  const [error, setError] = useState(null);    // Estado para manejar errores

    const obtenerUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error al obtener usuarios', error);
        setError('Error al obtener usuarios');
      }
    };


  useFocusEffect(
    React.useCallback(() => {
        obtenerUsuarios();
    }, [])
  );

  // Función para manejar la eliminación del usuario
  const handleEliminarUsuario = async (boleta) => {
    try {
      await deleteUsuario(boleta); // Llama a la función API para eliminar
      setUsuarios(usuarios.filter((usuario) => usuario.boleta !== boleta)); // Elimina al usuario del estado
    } catch (error) {
      console.error('Error al eliminar usuario', error);
      Alert.alert('Error', 'Error al eliminar usuario');
    }
  };

  // Función para manejar la edición del usuario
  const handleEditarUsuario = (boleta) => {
    navigation.navigate('EditarUsuario', { boleta }); // Navega a la pantalla de edición
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderUsuario = ({ item }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.infoUSer}>
        <Text style={styles.cell}>{item.boleta}</Text>
        <Text style={styles.cell}>{item.nombre}</Text>
        <Text style={styles.cell}>{item.appat}</Text>
        <Text style={styles.cell}>{item.apmat}</Text>
        <Text style={styles.cell}>{item.email}</Text>

        <View style={styles.rowInfo}>
          <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => handleEditarUsuario(item.boleta)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => handleEliminarUsuario(item.boleta)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.boleta}
        renderItem={renderUsuario}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay usuarios disponibles.</Text>}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoUSer:{
    flexDirection: 'column',
    marginBottom : 8,
    marginTop: 8,
    marginLeft : 25,
  },
  rowInfo:{
    flexDirection: 'row',
    marginTop : 8,

  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#4caf50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#f00',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ListaUsuarios;
