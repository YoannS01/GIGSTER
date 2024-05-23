import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect } from "react";

//changer la ligne dans le tab navigator pour aller sur
//      <Tab.Screen name="Add" component={StatusScreen} />

export default function diyTourScreen() {
  const [currentPosition, setCurrentPosition] = useState(null);
  console.log(currentPosition);

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  return (
    <MapView style={styles.map}>
      <Marker coordinate={currentPosition} title="Me !" pinColor="#fecb2d" />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
