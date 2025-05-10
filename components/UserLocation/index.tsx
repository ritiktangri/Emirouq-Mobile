// useCurrentLocation.js
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Platform, Alert } from 'react-native';

export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  const fetchLocation = async () => {
    try {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Location Permission', 'Permission to access location was denied');
        return;
      }

      // Get current position
      let locationResult: any = await Location.getCurrentPositionAsync({});
      setLocation(locationResult);

      // Get address from latitude and longitude
      let [addressResult]: any = await Location.reverseGeocodeAsync({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      });

      setAddress(addressResult);
    } catch (error: any) {
      console.error('Error getting location:', error);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    if (!address) {
      fetchLocation();
    }
  }, [address]);

  return { location, address, errorMsg };
}
