import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect } from "react";

//changer la ligne dans le tab navigator pour aller sur
//      <Tab.Screen name="Add" component={StatusScreen} />

export default function diyTourScreen() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentPosition(location.coords);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        });

        Location.watchPositionAsync({ distanceInterval: 10 }, () => {
          setCurrentPosition(location.coords);
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        });
      }
    })();
  }, []);

  if (!mapRegion) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <MapView style={styles.map} initialRegion={{ mapRegion }}>
      {currentPosition && (
        <Marker coordinate={currentPosition} title="Me !" pinColor="#fecb2d" />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
