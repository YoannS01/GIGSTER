<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View, TextInput, SafeAreaView, StatusBar, Button, TouchableOpacity, ImageViewer, Pressable } from 'react-native';
=======
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
>>>>>>> 041a53a1bda9766c6f57b4e82f2117adc86a4ab2
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from "react-native-dropdown-picker";

<<<<<<< HEAD
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';

import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { eachDayOfInterval, format, isBefore } from 'date-fns';

export default function AnnounceScreen() {
    const [instrumentList, setInstrumentList] = useState([]);
    const [accomodation, setAccomodation] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Bar', value: 'bar' },
        { label: 'Maison', value: 'maison' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Appartement', value: 'appartement' },
    ]);

    const handleOnPress = (instru) => {
        if (!instrumentList.includes(instru)) {
            setInstrumentList([...instrumentList, instru]);
        } else {
            setInstrumentList(instrumentList.filter(e => e !== instru));
        }
    };

    const handleOnPressTwo = (accom) => {
        if (!accomodation.includes(accom)) {
            setAccomodation([...accomodation, accom]);
        } else {
            setAccomodation(accomodation.filter(e => e !== accom));
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleValueChange = (value) => {
        setValue(value);
        const selectedItem = items.find(item => item.value === value);
        setSelectedOption(selectedItem ? selectedItem.label : '');
    };

    useEffect(() => {
        if (value !== null) {
            const selectedItem = items.find(item => item.value === value);
            setSelectedOption(selectedItem ? selectedItem.label : '');
        }
    }, [value]);


    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
        } else {
            alert('You did not select any image.');
        }
    };

    const [sliderValue, setSliderValue] = useState(10);

    //Calendrier :

    LocaleConfig.locales['fr'] = {
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ],
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Di.', 'Lu.', 'Ma.', 'Me.', 'Je.', 'Ve.', 'Sa.'],
        today: "Aujourd'hui"
    };

    LocaleConfig.defaultLocale = 'fr';
    //const [selected, setSelected] = useState('');

    const [markedDates, setMarkedDates] = useState({});
    const [selectionStart, setSelectionStart] = useState(null);
    const [selectionEnd, setSelectionEnd] = useState(null);

    const onDayPress = (day) => {
        const selectedDate = day.dateString;
        if (!selectionStart || (selectionStart && selectionEnd)) {
            // Début nouvelle période
            setSelectionStart(selectedDate);
            setSelectionEnd(null);
            setMarkedDates({
                [selectedDate]: { selected: true, startingDay: true, endingDay: true, color: 'blue' }
            });
        } else {
            // Complète la sélection de la période
            const newSelectionEnd = selectedDate;
            if (isBefore(new Date(newSelectionEnd), new Date(selectionStart))) {
                setSelectionStart(newSelectionEnd);
                setSelectionEnd(selectionStart);
            } else {
                setSelectionEnd(newSelectionEnd);
            }
            markPeriod(selectionStart, newSelectionEnd);
        }
    };

    const markPeriod = (start, end) => {
        const interval = eachDayOfInterval({
            start: new Date(start),
            end: new Date(end)
        });

        const newMarkedDates = {};
        interval.forEach((date, index) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            newMarkedDates[formattedDate] = {
                selected: true,
                startingDay: index === 0,
                endingDay: index === interval.length - 1,
                color: 'blue'
            };
        });

        setMarkedDates(newMarkedDates);
    };
=======
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
>>>>>>> 041a53a1bda9766c6f57b4e82f2117adc86a4ab2

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

<<<<<<< HEAD
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.title}>Adresse de votre lieu d'accueil :</Text>
                    <TextInput placeholder="Indiquez la rue" style={styles.input_address} />
                    <TextInput placeholder="Indiquez la ville" style={styles.input_address} />
                    <TextInput placeholder="Indiquez le code postale" style={styles.input_address} />
                </View>

                <View>
                    <Text style={styles.title}>Décrivez votre lieu d'accueil :</Text>
                    <TextInput placeholder="Description du lieu d'accueil" style={styles.input_description} />
                </View>

                {/*Dropdown list concernant le type de lieu d'accueil*/}
                <View style={styles.block_container}>
                    <Text style={styles.title}>Choisissez le type de votre lieu d'accueil :</Text>

                    <TouchableOpacity style={styles.button} title="Choisir" onPress={() => setModalVisible(true)} >
                        <Text style={styles.button_text}>Choisir</Text>
                    </TouchableOpacity>
                    {selectedOption ? (
                        <Text style={styles.selectedOption}>Type de lieu choisi : {selectedOption}</Text>
                    ) : null}
                </View>

                {/*Checkbox de validation pour lieu accessible aux handicapés*/}
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
                        onPress={(isChecked) => { console.log(isChecked) }}
                    />
                </View>

                {/*Bloc sur les services mis à disposition des artistes par l'hôte*/}
                <View style={styles.block_container}>
                    <Text style={styles.title}>Sélectionnez les services disponibles :</Text>
                    <TouchableOpacity
                        style={[styles.accomodationButton, { borderColor: accomodation.includes('Restauration') ? 'green' : 'black' }]}
                        onPress={() => handleOnPressTwo('Restauration')}
                    >
                        <Text style={styles.instrument_text}>Restauration 🍽</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.accomodationButton, { borderColor: accomodation.includes('Hébergement') ? 'green' : 'black' }]}
                        onPress={() => handleOnPressTwo('Hébergement')}
                    >
                        <Text style={styles.instrument_text}>Hébergement 🛏</Text>
                    </TouchableOpacity>
                </View>

                {/*Bloc instruments mis à la disponibilité des artistes par l'hôte*/}
                <View style={styles.block_container}>
                    <Text style={styles.title}>Sélectionnez les instruments que vous pouvez mettre à disposition des artistes :</Text>
                    <TouchableOpacity
                        style={[styles.instrumentButton, { borderColor: instrumentList.includes('Piano') ? 'green' : 'black' }]}
                        onPress={() => handleOnPress('Piano')}
                    >
                        <Text style={styles.instrument_text}>Piano</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.instrumentButton, { borderColor: instrumentList.includes('Batterie') ? 'green' : 'black' }]}
                        onPress={() => handleOnPress('Batterie')}
                    >
                        <Text style={styles.instrument_text}>Batterie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.instrumentButton, { borderColor: instrumentList.includes('Ampli') ? 'green' : 'black' }]}
                        onPress={() => handleOnPress('Ampli')}
                    >
                        <Text style={styles.instrument_text}>Ampli</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.instrumentButton, { borderColor: instrumentList.includes('Système son') ? 'green' : 'black' }]}
                        onPress={() => handleOnPress('Système son')}
                    >
                        <Text style={styles.instrument_text}>Système son</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.instrumentButton, { borderColor: instrumentList.includes('Table de mixage') ? 'green' : 'black' }]}
                        onPress={() => handleOnPress('Table de mixage')}
                    >
                        <Text style={styles.instrument_text}>Table de mixage</Text>
                    </TouchableOpacity>
                </View>

                {/*Ajout de photos via la galerie du téléphone*/}
                <View style={styles.block_container}>
                    <Text style={styles.title}>Ajoutez une image à votre annonce :</Text>
                    <TouchableOpacity style={styles.button} title="Choisir mon image" onPress={pickImageAsync}>
                        <Text style={styles.button_text}>Choisir</Text>
                    </TouchableOpacity>
                </View>

                {/*Slider sur la capacité d'accueil de l'hôte*/}
                <View>
                    <Text style={styles.title}>Capacité d'accueil:</Text>

                    <Text>Capacité: {sliderValue}</Text>

                    <Slider
                        style={{ width: 350, height: 45 }}
                        minimumValue={10}
                        maximumValue={200}
                        minimumTrackTintColor="#5100FF"
                        maximumTrackTintColor="#000000"
                        step={10}
                        value={sliderValue}
                        onValueChange={
                            (sliderValue) => setSliderValue(sliderValue)
                        }
                    />
                </View>

                {/* Calendrier */}
                <View style={styles.block_container}>
                    <Text style={styles.title}>Indiquez les plages de disponibilité de votre lieu d'accueil:</Text>
                    <CalendarList
                        horizontal={true}
                        pagingEnabled={true}
                        calendarWidth={350}
                        onDayPress={onDayPress}
                        markedDates={markedDates}
                        markingType={'period'}
                    />
                </View>


            </ScrollView>

            {/* Modal pour le DropDownPicker */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalView}>
                    <Text style={styles.title}>Choisissez votre type lieu d'accueil :</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder={"Type de lieu d'accueil..."}
                        containerStyle={{ height: open ? 200 : 40, marginTop: 10, marginBottom: 10 }}
                    />
                    <TouchableOpacity style={styles.button} title="Fermer" onPress={handleCloseModal}>
                        <Text style={styles.button_text}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#e1f5ff",
        paddingTop: 20,
        paddingBottom: 20,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    button: {

        backgroundColor: '#5100FF',
        justifyContent: 'center',
        alignContent: 'center',
        height: 40,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3
    },
    button_text: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 5,
        paddingRight: 5,
    },
    input_address: {
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5
    },
    input_description: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5,
    },
    instrument_text: {
        fontSize: 15,
    },
    dropdownlist_lieu_accueil: {
        width: '100%',
        marginBottom: 10,
        marginTop: 10,
        zIndex: 1000,
    },
    accesibility: {
        width: '90%',
        marginBottom: 10,
        marginTop: 10,
        zIndex: 10,
    },
    block_container: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        zIndex: 10,
    },
    accomodationButton: {
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3
    },
    instrumentButton: {
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3
    },
    title: {
        fontWeight: '700',
        fontSize: 17,
        marginTop: 10,
    },
    selectedOption: {
        marginTop: 10,
        fontSize: 16,
        color: 'blue',
    },
    modalView: {
        marginTop: 200,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 5
    },
    add_image: {
        marginTop: 5,
        marginBottom: 10,
    },


});
=======
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
>>>>>>> 041a53a1bda9766c6f57b4e82f2117adc86a4ab2
