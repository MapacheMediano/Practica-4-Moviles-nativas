README para el uso de la practica 4 Apps Moviles Nativas
# Práctica 4: Aplicación de Búsqueda de Películas y Series ✨✨

Este proyecto es una práctica desarrollada para la materia de **Aplicaciones Móviles Nativas**. La aplicación permite a los usuarios buscar películas y series en un catálogo dinámico utilizando el consumo de una API. Fue desarrollada con **React Native**.

## Descripción
La aplicación permite a los usuarios:

- Buscar películas y series mediante un catálogo dinámico.
- Visualizar información detallada de los resultados obtenidos de la API.

## Repositorio
[Repositorio en GitHub](https://github.com/MapacheMediano/Practica-4-Moviles-nativas/tree/master)

## Instrucciones para ejecutar el proyecto

### 1. Clona el repositorio
```bash
git clone https://github.com/MapacheMediano/Practica-4-Moviles-nativas.git
```

### 2. Navega al directorio del proyecto
```bash
cd Practica-4-Moviles-nativas
```

### 3. Instala las dependencias
1. Asegúrate de tener **Node.js** y **npm** instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
2. Instala las dependencias del proyecto ejecutando:
   ```bash
   npm install
   ```
   o
   ```bash
   yarn install
   ```

### 4. Configura la clave de la API
1. Obtén una clave válida de la API externa utilizada para la búsqueda de películas.
2. Busca en el proyecto el archivo donde se configura la clave de la API (por ejemplo, `config.js` o un archivo similar).
3. Reemplaza la clave de ejemplo con tu clave válida.

### 5. Ejecuta la aplicación
1. Inicia el servidor de desarrollo:
   ```bash
   npx react-native start
   ```
2. En otra terminal, ejecuta la aplicación en un emulador o dispositivo físico:
   - Para Android:
     ```bash
     npx react-native run-android
     ```
   - Para iOS:
     ```bash
     npx react-native run-ios
     ```

## Consideraciones adicionales

- Si ejecutas la aplicación en un dispositivo físico, asegúrate de que esté conectado a la misma red que tu computadora.
- Verifica que el emulador esté configurado correctamente y tenga acceso a internet.

---
