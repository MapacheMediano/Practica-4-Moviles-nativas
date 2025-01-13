import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Gato from './screens/Gato';
import ListaUsuarios from './screens/ListaUsuarios';
import EditarUsuario from './screens/EditarUsuario';
import CerrarSesion from './screens/CerrarSesion';
import Movies from './screens/Movies';
import Favoritos from './screens/Favoritos';
import BluetoothApp from './screens/Bluetooth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator(); // Para manejar rutas adicionales no incluidas en el Drawer

export default function App() {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es admin


  useEffect(() => {
    // Verificar si el usuario está autenticado solo al cargar el componente
    const checkAuthentication = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user?.token) {
          setIsAuthenticated(true);
          if (user === 'admin077') {
            setIsAdmin(true);
          }else{
            setIsAdmin(false);
          }
        }

      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };

    checkAuthentication();
  }, []); // Solo ejecutarse una vez cuando el componente se monte

  // Función para manejar el logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };
  const handleAdmin = (isAdmin) => {
    setIsAdmin(isAdmin);
  }

  // Función para manejar el login
  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#0496ff' },
          headerTintColor: '#fff',
        }}
      >
        {/* Drawer Navigator para las pantallas principales */}
        <Stack.Screen name="Drawer" options={{ headerShown: false }}>
          {(props) => <DrawerScreens isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} handleAdmin={handleAdmin} isAdmin={isAdmin} handleLogin={handleLogin} handleLogout={handleLogout} {...props} />}
        </Stack.Screen>

        {/* Pantalla EditarUsuario no visible en el menú */}
        <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerScreens({ isAuthenticated, handleAdmin,isAdmin, handleLogin, handleLogout }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: '#f0f0f0',
          width: 240,
        },
        headerStyle: {
          backgroundColor: '#0d47a1',
        },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#6200ee',
        drawerInactiveTintColor: '#000',
      }}
    >
      {/* Condicional para mostrar opciones de login o de usuario autenticado */}

      {!isAuthenticated && (
        <>
          <Drawer.Screen name="Login">
            {(props) => <Login {...props} actLogin={handleLogin} actAdmin={handleAdmin} />}
          </Drawer.Screen>
          <Drawer.Screen name="Registrar" component={Register} />
        </>
      )} 
      
      { isAuthenticated && isAdmin &&  (
        <>
          <Drawer.Screen name="Lista Usuarios" component={ListaUsuarios} />
          
        </>
      )}

      
      { isAuthenticated && (
        <>
          <Drawer.Screen name="CerrarSesion">
            {(props) => <CerrarSesion {...props} actLogout={handleLogout} />}
          </Drawer.Screen>
        </>
      )}
      <Drawer.Screen name="Gato" component={Gato} />
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Programas TV" component={Movies}/>
      <Drawer.Screen name="Programas Favoritos" component={Favoritos}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
