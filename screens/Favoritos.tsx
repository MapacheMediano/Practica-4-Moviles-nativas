import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { getMovies } from '../src/api/apiMovies';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Favoritos = ({navigation})=>{

  const [favoritos, setFavoritos] = useState([]);
  const [query, setQuery] = useState('');

  const obtenerMovies = async () => {
        try {
          const data = JSON.parse(await AsyncStorage.getItem('favoritos'));
          setFavoritos(data); // Guarda los datos en el estado
        } catch (error) {
          console.error('Error al obtener usuarios', error);
        }
  };

  const handleEliminarFavoritos = async (id) => {
    const newFavoritos = favoritos.filter((fav) => fav.show.id !== id);
    setFavoritos(newFavoritos);
    await AsyncStorage.setItem('favoritos', JSON.stringify(newFavoritos));
    Alert.alert('Favoritos', `Eliminado de favoritos`);
  }

  useFocusEffect(
      React.useCallback(() => {
          obtenerMovies();
      }, [])
  );



    const renderMovie = ({item})=>(
          <View style={styles.row}>
              <Image source={{ uri: item.show.image?.medium}} style={styles.image} />
              <View style={styles.infoUSer}>
                <Text style={styles.titleMovie}>{item.show.name}</Text>
                <Text style={styles.cell}>{item.show.summary?.replace(/<\/?(p|b|i|strong)>/g, '')}</Text>
        
                <View style={styles.rowInfo}>
                  <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => handleEliminarFavoritos(item.show.id)}
                    >
                      <Text style={styles.buttonText}>Eliminar Favoritos</Text>
                    </TouchableOpacity>
                </View>
              </View>
              
            </View>

    );

    return (

        <View style={styles.container}>
              <Text style={styles.title}>Mis Programas Favoritos</Text>
              <FlatList
                data={favoritos}
                renderItem={renderMovie}
                keyExtractor={item => item.show.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay progrmas de TV en favoritos.</Text>}
              />
          </View>
    );
};

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
      justifyContent: 'space-between',
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
      flex: 1,
      textAlign: 'right',
      flexDirection: 'column',
      marginBottom : 8,
      marginTop: 8,
      marginLeft : 20,
    },
    rowInfo:{
      flexDirection: 'row',
      marginTop : 8,
  
    },
    cell: {
      flex: 1,
      fontSize: 14,
    },
    titleMovie:{
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      
    },
    button: {
      padding: 8,
      borderRadius: 4,
      marginLeft: 8,
      marginBottom: 5,
    },
    buscarButton: {
      backgroundColor: '#00a8e8',
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
      width: 150,
      height: 220,
    },
    input: {
      height: 40,
      width: 220,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
    },
  });

export default Favoritos;