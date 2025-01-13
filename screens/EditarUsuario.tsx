import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUsuario, editarUsuario } from '../src/api/users';

const EditarUsuario = ({navigation, route}) => {

    const { boleta } = route.params; // Obtenemos el parámetro boleta
    const [idUser, setIdUser] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          handleChange('img', result.assets[0].uri);
        }
      };
    
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        appat: '',
        apmat: '',
        email: '',
        password: '',
        boleta: '',
        img: '',
        rol: '0',
    });

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const data = await getUsuario(boleta);
                data[0].password = '';
                setIdUser(data[0].id);
                setFormData(data[0]);
            } catch (error) {
                console.error('Error al obtener usuario', error);
                Alert.alert('Error', 'No se pudo obtener la información del usuario.');
            }
        };

        obtenerUsuario();
    }, []);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrorMessage('');
    };

    const handleSubmit = async () => {
        try {
            await editarUsuario(formData, idUser);
            Alert.alert('Éxito', 'Usuario actualizado correctamente.');
            navigation.goBack(); // Navegar a la lista de usuarios
        } catch (error) {
            console.error('Error en la actualización', error);
            setErrorMessage(
                error.response?.data?.message || 'Error al actualizar el usuario. Inténtalo de nuevo.'
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Usuario</Text>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

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
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
            />
            <Button title="Subir Imágen" onPress={pickImage} />
                  {!image && <Image source={{ uri: formData.img }} style={styles.image} />}
                    {image && <Image source={{ uri: image }} style={styles.image} />}
            <View style={styles.button}>
                <Button title="Guardar" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#35ace4',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 10,
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

export default EditarUsuario;
