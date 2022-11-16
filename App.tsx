import {StatusBar} from 'expo-status-bar';
import {useState, useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';

import * as Location from 'expo-location';

import * as OCMConfig from './OCMConfig.json';

type ParamKey = 'key' | 'latitude' | 'longitude' | 'maxresults';

interface AddressInfo {
  AddressLine1: String,
  Town: String,
  StateOrProvince: String,
  Postcode: String,
};
interface Charger {
  AddressInfo: AddressInfo,
};

export default function App() {
  const [chargers, setChargers] = useState([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selected, setSelected] = useState<Charger | null>(null);

  useEffect(() => {
    (async () => {
      const permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions.status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const {latitude, longitude} = location.coords;
      const params = {
        key: OCMConfig.apiKey,
        latitude: latitude,
        longitude: longitude,
        maxresults: 10,
      };
      const paramString = Object.keys(params).map(key => `${key}=${params[key as ParamKey]}`).join('&');
      const res = await fetch(`https://api.openchargemap.io/v3/poi?${paramString}`).then(r => r.json());
      setChargers(res);
    })();
  }, []);

  const startCharging = () => {
    console.log(selected)
  }

  return (
    <View style={styles.container}>
      <StatusBar style={'auto'} />
      <SafeAreaView>
        <ScrollView>
          {
            chargers.map((charger: Charger, i) => (
              <TouchableOpacity key={i} onPress={() => setSelected(charger)}>
                <Text>{charger.AddressInfo.AddressLine1}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <Button onPress={startCharging} title={'Start Charging'} disabled={selected === null} />
      </SafeAreaView>
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
