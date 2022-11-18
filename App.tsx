import {StatusBar} from 'expo-status-bar';
import {useState, useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import OpenChargeMap, {Charger} from './classes/OpenChargeMap';
import API from './classes/API';

import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';


export default function App() {
  const [chargers, setChargers] = useState<Array<Charger>>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selected, setSelected] = useState<Charger | null>(null);

  const getLocation = async (): Promise<LocationObjectCoords> => {
    const permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions.status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    return location.coords;
  }

  useEffect(() => {
    (async () => {
      try {
        const {latitude, longitude} = await getLocation();
        const chargers = await OpenChargeMap.getNearby(longitude, latitude);
        setChargers(chargers);
      } catch(e) {
        Alert.alert((e as Error).message);
      }
    })();
  }, []);

  const startCharging = async () => {
    if (selected) {
      // Original problem said to use ChargePointID but that doesn't exist in all objects, so ID was a better choice.
      try {
        await API.startCharging(selected.ID);
      } catch(e) {
        Alert.alert((e as Error).message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style={'auto'} />
      <SafeAreaView>
        <ScrollView>
          {
            chargers.map((charger: Charger, i) => (
              <TouchableOpacity key={i} onPress={() => setSelected(charger)}>
                <Text style={{color: selected && selected.ID === charger.ID ? 'green' : 'black'}}>{charger.AddressInfo.AddressLine1}</Text>
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
