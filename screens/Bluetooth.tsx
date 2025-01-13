import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BluetoothApp = () => {
  const [manager, setManager] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  useEffect(() => {
    const bleManager = new BleManager();
    setManager(bleManager);

    return () => {
      bleManager.destroy();
    };
  }, []);

  const startScan = () => {
    if (manager) {
      setIsScanning(true);
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error(error);
          return;
        }

        if (device && !devices.find(d => d.id === device.id)) {
          setDevices(prevDevices => [...prevDevices, device]);
        }
      });
    }
  };

  const stopScan = () => {
    if (manager) {
      manager.stopDeviceScan();
      setIsScanning(false);
    }
  };

  const connectToDevice = (deviceId) => {
    if (manager) {
      const device = devices.find(d => d.id === deviceId);
      if (device) {
        device.connect()
          .then((device) => {
            setConnectedDevice(device);
            console.log('Conectado a:', device.name);
          })
          .catch((error) => {
            console.error('Error al conectar:', error);
          });
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bluetooth App</Text>
      <Button
        title={isScanning ? 'Detener Escaneo' : 'Escanear Dispositivos'}
        onPress={isScanning ? stopScan : startScan}
      />
      <View>
        {devices.map((device) => (
          <View key={device.id} style={{ margin: 10 }}>
            <Text>{device.name || 'Dispositivo desconocido'}</Text>
            <Button
              title="Conectar"
              onPress={() => connectToDevice(device.id)}
            />
          </View>
        ))}
      </View>

      {connectedDevice && (
        <View style={{ marginTop: 20 }}>
          <Text>Dispositivo Conectado: {connectedDevice.name}</Text>
        </View>
      )}
    </View>
  );
};

export default BluetoothApp;
