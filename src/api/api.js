import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.56.1:3000";

const api = axios.create({
    baseURL: API_URL,
});

// Configurar el token dinámicamente
api.interceptors.request.use(
    async (config) => {
        try {
            const user = await AsyncStorage.getItem('user'); // Recuperar el usuario del almacenamiento
            if (user?.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        } catch (error) {
            console.error('Error al recuperar el token:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
