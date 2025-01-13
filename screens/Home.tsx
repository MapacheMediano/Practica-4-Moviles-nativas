import React from 'react';
import { View, Text, StyleSheet, ImageBackground,Image } from 'react-native';


const Home = () => {
  return (
   
      <View style={styles.container}>
        
        <Image source={require('../assets/escudoESCOM.png')} style={styles.image} />
        <Text style={styles.title}>Bienvenido a OnToy</Text>
        <Text style={styles.description}>
          Aplicación con mapa interactiva de la ESCOM y un sistema de rutas para llegar a tu destino.
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#42a5f5', // Fondo semi-transparente para mejorar la visibilidad del texto
    margin: 0, // Espaciado alrededor del contenido
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center', // Centra el texto
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center', // Centra el texto
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
}
});

export default Home;
