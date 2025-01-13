import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { login } from '../src/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation,actLogin,actAdmin}) => {
    const [boleta, setBoleta] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const data = await login(boleta, password);
            console.log('Usuario logueado:', JSON.stringify(data));

            // Mostrar mensaje de éxito
            Alert.alert('Inicio de sesión', '¡Login exitoso!');
            await AsyncStorage.setItem('user', data.boleta);
            navigation.navigate('Inicio');
            boleta == 'admin077' ? actAdmin(true) : actAdmin(false);
            actLogin();
        } catch (error) {
            console.error('Error en el login', error);

            // Mostrar mensaje de error
            Alert.alert('Error', error.response?.data?.message || 'Error en el inicio de sesión. Inténtalo de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/escudoESCOM.png')} style={styles.image} />
            <Text style={styles.title}>OnToy</Text>

            <TextInput
                style={styles.input}
                placeholder="Boleta"
                value={boleta}
                onChangeText={setBoleta}
                keyboardType="default"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Login" onPress={handleSubmit} />
            
        
            <Button title="Registrarse" onPress={() => navigation.navigate('Registrar')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#35ace4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

export default Login;
