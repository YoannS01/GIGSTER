import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Button,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from "react-native-dropdown-picker";

import { launchImageLibrary } from "react-native-image-picker";
import { launchCamera } from "react-native-image-picker";

export default function AnnounceScreen() {
  const [checked, setChecked] = useState(false);

  const [instrumentList, setInstrumentList] = useState([]);
  console.log(instrumentList);

  const handleOnPress = (instru) => {
    if (!instrumentList.includes(instru)) {
      setInstrumentList([...instrumentList, instru]);
    } else {
      setInstrumentList(instrumentList.filter((e) => e !== instru));
    }
  };

  const [accomodation, setAccomodation] = useState([]);
  console.log(accomodation);

  const handleOnPressTwo = (accom) => {
    if (!accomodation.includes(accom)) {
      setAccomodation([...accomodation, accom]);
    } else {
      setAccomodation(accomodation.filter((e) => e !== accom));
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Bar", value: "bar" },
    { label: "Maison", value: "maison" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Appartement", value: "appartement" },
  ]);

  const openImagePicker = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  handleCameraLaunch = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.error) {
        console.log("Camera Error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>Adresse de votre lieu d'accueil :</Text>
          <TextInput
            placeholder="Indiquez la rue"
            style={styles.input_address}
          ></TextInput>
          <TextInput
            placeholder="Indiquez la ville"
            style={styles.input_address}
          ></TextInput>
          <TextInput
            placeholder="Indiquez le code postale"
            style={styles.input_address}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.title}>Décrivez votre lieu d'accueil :</Text>
          <TextInput
            placeholder="Description du lieu d'accueil"
            style={styles.input_description}
          ></TextInput>
        </View>

        {/*Dropdown list concernant le type de lieu d'accueil*/}
        <View
          style={[styles.dropdownlist_lieu_accueil, open && { zIndex: 1000 }]}
        >
          <Text style={styles.title}>
            Choisissez votre type lieu d'accueil :
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"Type lieu d'accueil..."}
            containerStyle={{ height: open ? 200 : 40 }}
          />
        </View>

        {/*Checkbox de validation pour lieu accessible aux handicapés, faire yarn add react-native-bouncy-checkbox*/}
        <View style={styles.accesibility}>
          <Text style={styles.title}>Accessibilité :</Text>
          <BouncyCheckbox
            size={25}
            fillColor="green"
            unFillColor="#FFFFFF"
            text="Lieu accessible aux handicapés"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={(isChecked) => {
              console.log(isChecked);
            }}
          />
        </View>

        <View style={styles.accomodations_container}>
          <Text style={styles.title}>
            Sélectionnez les servicess disponibles :
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: accomodation.some((e) => e === "Restauration")
                ? "yellow"
                : "white",
              height: "20%",
              margin: 5,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 25,
              borderWidth: 2,
            }}
            onPress={() => handleOnPressTwo("Restauration")}
          >
            <Text style={styles.instrument_text}>Restauration 🍽</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: accomodation.some((e) => e === "Hébergement")
                ? "yellow"
                : "white",
              height: "20%",
              margin: 5,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 25,
              borderWidth: 2,
            }}
            onPress={() => handleOnPressTwo("Hébergement")}
          >
            <Text style={styles.instrument_text}>Hébergement 🛏</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.instruments_container}>
          <Text style={styles.title}>
            Sélectionnez les intsruments que vous pouvez mettre à disposition
            des artistes :
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: instrumentList.some((e) => e === "Piano")
                ? "yellow"
                : "white",
              height: "20%",
              margin: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 25,
              borderWidth: 2,
            }}
            onPress={() => handleOnPress("Piano")}
          >
            <Text style={styles.instrument_text}>Piano</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: instrumentList.some((e) => e === "Batterie")
                ? "yellow"
                : "white",
              height: "20%",
              margin: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 25,
              borderWidth: 2,
            }}
            onPress={() => handleOnPress("Batterie")}
          >
            <Text style={styles.instrument_text}>Batterie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: instrumentList.some((e) => e === "Ampli")
                ? "yellow"
                : "white",
              height: "20%",
              margin: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 25,
              borderWidth: 2,
            }}
            onPress={() => handleOnPress("Ampli")}
          >
            <Text style={styles.instrument_text}>Ampli</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: instrumentList.some((e) => e === "Système son")
                ? "yellow"
                : "white",
              height: "20%",
              margin: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 25,
              borderWidth: 2,
            }}
            onPress={() => handleOnPress("Système son")}
          >
            <Text style={styles.instrument_text}>Système son</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: instrumentList.some(
                (e) => e === "Table de mixage"
              )
                ? "yellow"
                : "white",
              height: "20%",
              margin: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 25,
              borderWidth: 2,
            }}
            onPress={() => handleOnPress("Table de mixage")}
          >
            <Text style={styles.instrument_text}>Table de mixage</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.title}>
            Ajoutez des images à votre lieu d'accueil :
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ marginTop: 20 }}>
            <Button title="Choose from Device" onPress={openImagePicker} />
          </View>
          <View style={{ marginTop: 20, marginBottom: 50 }}>
            <Button title="Open Camera" onPress={handleCameraLaunch} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#e1f5ff",
  },
  scrollView: {
    marginHorizontal: 20,
  },

  input_address: {
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
  input_description: {
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    height: 100,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
  instruments_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },

  instrument_text: {
    fontSize: 15,
  },
  dropdownlist_lieu_accueil: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    zIndex: 1000,
  },
  accesibility: {
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    zIndex: 10,
  },
  accomodations_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    zIndex: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: "17px",
  },
});

console.log('debug')