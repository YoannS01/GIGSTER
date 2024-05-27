import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });

        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  if (!mapRegion) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        latitudeDelta: mapRegion.latitudeDelta,
        longitudeDelta: mapRegion.longitudeDelta,
      }}
    >
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
