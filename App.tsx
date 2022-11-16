import {StatusBar} from 'expo-status-bar';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import * as Location from 'expo-location';

import * as OCMConfig from './OCMConfig.json';

export default function App() {
  const [chargers, setChargers] = useState<Array<Object> | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    (async () => {
      const permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions.status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
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
