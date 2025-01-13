import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { signup } from '../src/api/auth'; // Asegúrate de que `signup` esté correctamente definido en tu archivo API

const Register = ({navigation}) => {
  const [formData, setFormData] = useState({
    boleta: '',
    email: '',
    password: '',
    nombre: '',
    appat: '',
    apmat: '',
    img:''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleChange('img', result.assets[0].uri);
    }
  };

  
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      const data = await signup(formData);
      // Guardar usuario en almacenamiento local (AsyncStorage)
      Alert.alert('Registro exitoso', 'Usuario registrado correctamente.');
      navigation.navigate('Login'); // Navegar a la pantalla principal
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage(
        error.response?.data?.message || 'Error en el registro. Inténtalo de nuevo.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formData.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        value={formData.appat}
        onChangeText={(value) => handleChange('appat', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        value={formData.apmat}
        onChangeText={(value) => handleChange('apmat', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Boleta"
        value={formData.boleta}
        onChangeText={(value) => handleChange('boleta', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <Button title="Subir Imágen" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Registrar" onPress={handleSubmit} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#35ace4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Register;
